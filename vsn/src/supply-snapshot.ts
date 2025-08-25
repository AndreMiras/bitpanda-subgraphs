import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  Burn as BurnEvent,
  Mint as MintEvent,
  VSN,
} from "../generated/VSN/VSN";
import { CumulativeSupplyStats, SupplySnapshot } from "../generated/schema";
import {
  handleBurn as handleBurnOriginal,
  handleMint as handleMintOriginal,
} from "./vsn";

const CUMULATIVE_STATS_ID = "cumulative";

function getCumulativeStats(): CumulativeSupplyStats {
  let stats = CumulativeSupplyStats.load(CUMULATIVE_STATS_ID);
  if (!stats) {
    stats = new CumulativeSupplyStats(CUMULATIVE_STATS_ID);
    stats.allTimeMinted = BigInt.zero();
    stats.allTimeBurned = BigInt.zero();
    stats.totalMintEvents = 0;
    stats.totalBurnEvents = 0;
    stats.lastUpdatedBlock = BigInt.zero();
    stats.lastUpdatedTimestamp = BigInt.zero();
  }
  return stats;
}

function updateCumulativeStats(
  event: ethereum.Event,
  eventType: string,
  amount: BigInt,
): CumulativeSupplyStats {
  let cumulativeStats = getCumulativeStats();

  if (eventType == "mint") {
    cumulativeStats.allTimeMinted = cumulativeStats.allTimeMinted.plus(amount);
    cumulativeStats.totalMintEvents++;
  } else if (eventType == "burn") {
    cumulativeStats.allTimeBurned = cumulativeStats.allTimeBurned.plus(amount);
    cumulativeStats.totalBurnEvents++;
  }

  cumulativeStats.lastUpdatedBlock = event.block.number;
  cumulativeStats.lastUpdatedTimestamp = event.block.timestamp;
  cumulativeStats.save();

  return cumulativeStats;
}

function createSnapshot(
  event: ethereum.Event,
  eventType: string,
  amount: BigInt,
  totalSupply: BigInt,
  cumulativeStats: CumulativeSupplyStats,
  from: Bytes | null = null,
  to: Bytes | null = null,
  minter: Bytes | null = null,
  burner: Bytes | null = null,
): void {
  let snapshot = new SupplySnapshot(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString(),
  );

  snapshot.blockNumber = event.block.number;
  snapshot.txHash = event.transaction.hash;
  snapshot.timestamp = event.block.timestamp;
  snapshot.eventType = eventType;
  snapshot.totalSupply = totalSupply;
  snapshot.amount = amount;
  snapshot.allTimeMinted = cumulativeStats.allTimeMinted;
  snapshot.allTimeBurned = cumulativeStats.allTimeBurned;

  if (from) snapshot.from = from;
  if (to) snapshot.to = to;
  if (minter) snapshot.minter = minter;
  if (burner) snapshot.burner = burner;

  snapshot.save();
}

function createSupplySnapshot(
  event: ethereum.Event,
  eventType: string,
  amount: BigInt,
  from: Bytes | null = null,
  to: Bytes | null = null,
  minter: Bytes | null = null,
  burner: Bytes | null = null,
): void {
  let contract = VSN.bind(event.address);
  let totalSupply = contract.totalSupply();

  let cumulativeStats = updateCumulativeStats(event, eventType, amount);
  createSnapshot(
    event,
    eventType,
    amount,
    totalSupply,
    cumulativeStats,
    from,
    to,
    minter,
    burner,
  );
}

export function handleMint(event: MintEvent): void {
  handleMintOriginal(event);
  const eventType = "mint";
  const amount = event.params.amount;
  const from = null as Bytes | null;
  const to = event.params.to;
  const minter = event.params.minter;
  const burner = null as Bytes | null;
  createSupplySnapshot(event, eventType, amount, from, to, minter, burner);
}

export function handleBurn(event: BurnEvent): void {
  handleBurnOriginal(event);
  const eventType = "burn";
  const amount = event.params.amount;
  const from = event.params.burner;
  const to = null as Bytes | null;
  const minter = null as Bytes | null;
  const burner = event.params.burner;
  createSupplySnapshot(event, eventType, amount, from, to, minter, burner);
}

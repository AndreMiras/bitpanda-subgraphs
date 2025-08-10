import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  DistributeRewards as DistributeRewardsEvent,
  sVSN,
} from "../generated/sVSN/sVSN";
import { YieldSnapshot } from "../generated/schema";
import {
  handleDistributeRewards as handleDistributeRewardsOriginal,
} from "./s-vsn";

function createYieldSnapshot(
  event: ethereum.Event,
  eventType: string,
): void {
  let contract = sVSN.bind(event.address);
  let totalAssets = contract.totalAssets();
  let totalSupply = contract.totalSupply();

  let snapshot = new YieldSnapshot(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString(),
  );
  snapshot.timestamp = event.block.timestamp;
  snapshot.blockNumber = event.block.number;
  snapshot.totalAssets = totalAssets;
  snapshot.totalSupply = totalSupply;
  snapshot.exchangeRate = totalSupply.isZero()
    ? BigDecimal.fromString("1")
    : totalAssets.toBigDecimal().div(totalSupply.toBigDecimal());
  snapshot.eventType = eventType;
  snapshot.txHash = event.transaction.hash;

  snapshot.save();
}

export function handleDistributeRewards(event: DistributeRewardsEvent): void {
  handleDistributeRewardsOriginal(event);
  createYieldSnapshot(event, "distributeRewards");
}

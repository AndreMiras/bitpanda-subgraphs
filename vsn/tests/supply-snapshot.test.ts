import {
  assert,
  beforeEach,
  clearStore,
  createMockedFunction,
  describe,
  test,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { CumulativeSupplyStats, SupplySnapshot } from "../generated/schema";
import { Burn as BurnEvent, Mint as MintEvent } from "../generated/VSN/VSN";
import { handleBurn, handleMint } from "../src/supply-snapshot";
import { createBurnEvent, createMintEvent } from "./vsn-utils";

// Constants
const CUMULATIVE_STATS_ID = "cumulative";
const CONTRACT_ADDRESS = Address.fromString(
  "0x1234567890123456789012345678901234567890",
);

describe("Supply Snapshot Tests", () => {
  beforeEach(() => {
    clearStore();

    const tokenSupply = 1_000_000;
    createMockedFunction(
      CONTRACT_ADDRESS,
      "totalSupply",
      "totalSupply():(uint256)",
    ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tokenSupply))]);
  });

  describe("Mint Events", () => {
    test("Should create supply snapshot and update cumulative stats on mint", () => {
      let minter = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000002");
      let amount = BigInt.fromI32(1000);

      let mintEvent = createMintEvent(minter, to, amount);
      mintEvent.address = CONTRACT_ADDRESS;

      handleMint(mintEvent);

      // Check if cumulative stats entity was created and updated
      assert.entityCount("CumulativeSupplyStats", 1);
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "1000",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeBurned",
        "0",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalMintEvents",
        "1",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalBurnEvents",
        "0",
      );

      // Check if supply snapshot was created
      assert.entityCount("SupplySnapshot", 1);

      let snapshotId =
        mintEvent.transaction.hash.toHex() +
        "-" +
        mintEvent.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshotId, "eventType", "mint");
      assert.fieldEquals("SupplySnapshot", snapshotId, "amount", "1000");
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "totalSupply",
        "1000000",
      );
      assert.fieldEquals("SupplySnapshot", snapshotId, "allTimeMinted", "1000");
      assert.fieldEquals("SupplySnapshot", snapshotId, "allTimeBurned", "0");
      assert.fieldEquals("SupplySnapshot", snapshotId, "to", to.toHexString());
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "minter",
        minter.toHexString(),
      );

      // Verify block and transaction data
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "blockNumber",
        mintEvent.block.number.toString(),
      );
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "timestamp",
        mintEvent.block.timestamp.toString(),
      );
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "txHash",
        mintEvent.transaction.hash.toHexString(),
      );
    });

    test("Should accumulate mint statistics across multiple events", () => {
      let minter1 = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let minter2 = Address.fromString(
        "0x0000000000000000000000000000000000000002",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000003");

      // First mint
      let mintEvent1 = createMintEvent(minter1, to, BigInt.fromI32(500));
      mintEvent1.address = CONTRACT_ADDRESS;
      mintEvent1.transaction.hash = Bytes.fromI32(1);
      handleMint(mintEvent1);

      // Second mint
      let mintEvent2 = createMintEvent(minter2, to, BigInt.fromI32(750));
      mintEvent2.address = CONTRACT_ADDRESS;
      mintEvent2.transaction.hash = Bytes.fromI32(2);
      handleMint(mintEvent2);

      // Check cumulative stats
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "1250",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalMintEvents",
        "2",
      );

      // Should have 2 snapshots
      assert.entityCount("SupplySnapshot", 2);

      // Check second snapshot has cumulative totals
      let snapshot2Id =
        mintEvent2.transaction.hash.toHex() +
        "-" +
        mintEvent2.logIndex.toString();
      assert.fieldEquals(
        "SupplySnapshot",
        snapshot2Id,
        "allTimeMinted",
        "1250",
      );
      assert.fieldEquals("SupplySnapshot", snapshot2Id, "amount", "750");
    });
  });

  describe("Burn Events", () => {
    test("Should create supply snapshot and update cumulative stats on burn", () => {
      let burner = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let amount = BigInt.fromI32(500);

      let burnEvent = createBurnEvent(burner, amount);
      burnEvent.address = CONTRACT_ADDRESS;

      handleBurn(burnEvent);

      // Check cumulative stats
      assert.entityCount("CumulativeSupplyStats", 1);
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "0",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeBurned",
        "500",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalMintEvents",
        "0",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalBurnEvents",
        "1",
      );

      // Check supply snapshot
      assert.entityCount("SupplySnapshot", 1);

      let snapshotId =
        burnEvent.transaction.hash.toHex() +
        "-" +
        burnEvent.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshotId, "eventType", "burn");
      assert.fieldEquals("SupplySnapshot", snapshotId, "amount", "500");
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "totalSupply",
        "1000000",
      );
      assert.fieldEquals("SupplySnapshot", snapshotId, "allTimeMinted", "0");
      assert.fieldEquals("SupplySnapshot", snapshotId, "allTimeBurned", "500");
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "from",
        burner.toHexString(),
      );
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "burner",
        burner.toHexString(),
      );
    });

    test("Should accumulate burn statistics across multiple events", () => {
      let burner1 = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let burner2 = Address.fromString(
        "0x0000000000000000000000000000000000000002",
      );

      // First burn
      let burnEvent1 = createBurnEvent(burner1, BigInt.fromI32(300));
      burnEvent1.address = CONTRACT_ADDRESS;
      burnEvent1.transaction.hash = Bytes.fromI32(1);
      handleBurn(burnEvent1);

      // Second burn
      let burnEvent2 = createBurnEvent(burner2, BigInt.fromI32(200));
      burnEvent2.address = CONTRACT_ADDRESS;
      burnEvent2.transaction.hash = Bytes.fromI32(2);
      handleBurn(burnEvent2);

      // Check cumulative stats
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeBurned",
        "500",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalBurnEvents",
        "2",
      );

      // Should have 2 snapshots
      assert.entityCount("SupplySnapshot", 2);

      // Check second snapshot has cumulative totals
      let snapshot2Id =
        burnEvent2.transaction.hash.toHex() +
        "-" +
        burnEvent2.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshot2Id, "allTimeBurned", "500");
      assert.fieldEquals("SupplySnapshot", snapshot2Id, "amount", "200");
    });
  });

  describe("Mixed Mint and Burn Events", () => {
    test("Should handle mixed mint and burn events correctly", () => {
      let minter = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let burner = Address.fromString(
        "0x0000000000000000000000000000000000000002",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000003");

      // Mint first
      let mintEvent = createMintEvent(minter, to, BigInt.fromI32(1000));
      mintEvent.address = CONTRACT_ADDRESS;
      mintEvent.transaction.hash = Bytes.fromI32(1);
      handleMint(mintEvent);

      // Then burn
      let burnEvent = createBurnEvent(burner, BigInt.fromI32(400));
      burnEvent.address = CONTRACT_ADDRESS;
      burnEvent.transaction.hash = Bytes.fromI32(2);
      handleBurn(burnEvent);

      // Check final cumulative stats
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "1000",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeBurned",
        "400",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalMintEvents",
        "1",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalBurnEvents",
        "1",
      );

      // Should have 2 snapshots
      assert.entityCount("SupplySnapshot", 2);

      // Check burn snapshot has all cumulative data
      let burnSnapshotId =
        burnEvent.transaction.hash.toHex() +
        "-" +
        burnEvent.logIndex.toString();
      assert.fieldEquals(
        "SupplySnapshot",
        burnSnapshotId,
        "allTimeMinted",
        "1000",
      );
      assert.fieldEquals(
        "SupplySnapshot",
        burnSnapshotId,
        "allTimeBurned",
        "400",
      );
      assert.fieldEquals("SupplySnapshot", burnSnapshotId, "eventType", "burn");
    });
  });

  describe("Edge Cases", () => {
    test("Should handle zero amount mint", () => {
      let minter = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000002");
      let amount = BigInt.zero();

      let mintEvent = createMintEvent(minter, to, amount);
      mintEvent.address = CONTRACT_ADDRESS;

      handleMint(mintEvent);

      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "0",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalMintEvents",
        "1",
      );

      let snapshotId =
        mintEvent.transaction.hash.toHex() +
        "-" +
        mintEvent.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshotId, "amount", "0");
    });

    test("Should handle zero amount burn", () => {
      let burner = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let amount = BigInt.zero();

      let burnEvent = createBurnEvent(burner, amount);
      burnEvent.address = CONTRACT_ADDRESS;

      handleBurn(burnEvent);

      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeBurned",
        "0",
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "totalBurnEvents",
        "1",
      );

      let snapshotId =
        burnEvent.transaction.hash.toHex() +
        "-" +
        burnEvent.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshotId, "amount", "0");
    });

    test("Should handle large amounts", () => {
      let minter = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000002");
      // Large amount: 1 billion tokens
      let amount = BigInt.fromString("1000000000");

      let mintEvent = createMintEvent(minter, to, amount);
      mintEvent.address = CONTRACT_ADDRESS;

      handleMint(mintEvent);

      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "allTimeMinted",
        "1000000000",
      );

      let snapshotId =
        mintEvent.transaction.hash.toHex() +
        "-" +
        mintEvent.logIndex.toString();
      assert.fieldEquals("SupplySnapshot", snapshotId, "amount", "1000000000");
    });
  });

  describe("Block and Transaction Data", () => {
    test("Should correctly store block and transaction data", () => {
      let minter = Address.fromString(
        "0x0000000000000000000000000000000000000001",
      );
      let to = Address.fromString("0x0000000000000000000000000000000000000002");
      let amount = BigInt.fromI32(1000);

      let mintEvent = createMintEvent(minter, to, amount);
      mintEvent.address = CONTRACT_ADDRESS;

      // The mock event should have block and transaction data
      let expectedBlockNumber = mintEvent.block.number;
      let expectedTimestamp = mintEvent.block.timestamp;
      let expectedTxHash = mintEvent.transaction.hash;

      handleMint(mintEvent);

      // Check cumulative stats has latest block info
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "lastUpdatedBlock",
        expectedBlockNumber.toString(),
      );
      assert.fieldEquals(
        "CumulativeSupplyStats",
        CUMULATIVE_STATS_ID,
        "lastUpdatedTimestamp",
        expectedTimestamp.toString(),
      );

      // Check snapshot has correct block info
      let snapshotId =
        mintEvent.transaction.hash.toHex() +
        "-" +
        mintEvent.logIndex.toString();
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "blockNumber",
        expectedBlockNumber.toString(),
      );
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "timestamp",
        expectedTimestamp.toString(),
      );
      assert.fieldEquals(
        "SupplySnapshot",
        snapshotId,
        "txHash",
        expectedTxHash.toHexString(),
      );
    });
  });
});

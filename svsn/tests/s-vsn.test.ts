import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Approval } from "../generated/schema"
import { Approval as ApprovalEvent } from "../generated/sVSN/sVSN"
import { handleApproval } from "../src/s-vsn"
import { createApprovalEvent } from "./s-vsn-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

let newApprovalEvent: ApprovalEvent

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    newApprovalEvent = createApprovalEvent(owner, spender, amount)
    handleApproval(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("Approval created and stored", () => {
    assert.entityCount("Approval", 1)
    const id = newApprovalEvent.transaction.hash.concatI32(newApprovalEvent.logIndex.toI32()).toHexString()

    assert.fieldEquals(
      "Approval",
      id,
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Approval",
      id,
      "spender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Approval",
      id,
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})

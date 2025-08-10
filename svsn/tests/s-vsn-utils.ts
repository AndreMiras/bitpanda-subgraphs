import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  AssetsClaimed,
  BpsYieldCapPerSecondUpdated,
  CooldownDurationUpdated,
  CooldownStarted,
  Deposit,
  DistributeRewards,
  MaximumRewardsCycleDurationUpdated,
  Paused,
  RewardsCycleCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  Unpaused,
  Withdraw,
  WithdrawSurplus
} from "../generated/sVSN/sVSN"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  amount: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return approvalEvent
}

export function createAssetsClaimedEvent(
  owner: Address,
  receiver: Address,
  assets: BigInt
): AssetsClaimed {
  let assetsClaimedEvent = changetype<AssetsClaimed>(newMockEvent())

  assetsClaimedEvent.parameters = new Array()

  assetsClaimedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  assetsClaimedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  assetsClaimedEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )

  return assetsClaimedEvent
}

export function createBpsYieldCapPerSecondUpdatedEvent(
  previousBpsYieldCapPerSecond: BigInt,
  newBpsYieldCapPerSecond: BigInt
): BpsYieldCapPerSecondUpdated {
  let bpsYieldCapPerSecondUpdatedEvent =
    changetype<BpsYieldCapPerSecondUpdated>(newMockEvent())

  bpsYieldCapPerSecondUpdatedEvent.parameters = new Array()

  bpsYieldCapPerSecondUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "previousBpsYieldCapPerSecond",
      ethereum.Value.fromUnsignedBigInt(previousBpsYieldCapPerSecond)
    )
  )
  bpsYieldCapPerSecondUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBpsYieldCapPerSecond",
      ethereum.Value.fromUnsignedBigInt(newBpsYieldCapPerSecond)
    )
  )

  return bpsYieldCapPerSecondUpdatedEvent
}

export function createCooldownDurationUpdatedEvent(
  previousDuration: BigInt,
  newDuration: BigInt
): CooldownDurationUpdated {
  let cooldownDurationUpdatedEvent =
    changetype<CooldownDurationUpdated>(newMockEvent())

  cooldownDurationUpdatedEvent.parameters = new Array()

  cooldownDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "previousDuration",
      ethereum.Value.fromUnsignedBigInt(previousDuration)
    )
  )
  cooldownDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDuration",
      ethereum.Value.fromUnsignedBigInt(newDuration)
    )
  )

  return cooldownDurationUpdatedEvent
}

export function createCooldownStartedEvent(
  owner: Address,
  assets: BigInt,
  shares: BigInt,
  cooldownEnd: BigInt
): CooldownStarted {
  let cooldownStartedEvent = changetype<CooldownStarted>(newMockEvent())

  cooldownStartedEvent.parameters = new Array()

  cooldownStartedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  cooldownStartedEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  cooldownStartedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  cooldownStartedEvent.parameters.push(
    new ethereum.EventParam(
      "cooldownEnd",
      ethereum.Value.fromUnsignedBigInt(cooldownEnd)
    )
  )

  return cooldownStartedEvent
}

export function createDepositEvent(
  caller: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
}

export function createDistributeRewardsEvent(
  rewards: BigInt
): DistributeRewards {
  let distributeRewardsEvent = changetype<DistributeRewards>(newMockEvent())

  distributeRewardsEvent.parameters = new Array()

  distributeRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigInt(rewards)
    )
  )

  return distributeRewardsEvent
}

export function createMaximumRewardsCycleDurationUpdatedEvent(
  previousDuration: BigInt,
  newDuration: BigInt
): MaximumRewardsCycleDurationUpdated {
  let maximumRewardsCycleDurationUpdatedEvent =
    changetype<MaximumRewardsCycleDurationUpdated>(newMockEvent())

  maximumRewardsCycleDurationUpdatedEvent.parameters = new Array()

  maximumRewardsCycleDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "previousDuration",
      ethereum.Value.fromUnsignedBigInt(previousDuration)
    )
  )
  maximumRewardsCycleDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDuration",
      ethereum.Value.fromUnsignedBigInt(newDuration)
    )
  )

  return maximumRewardsCycleDurationUpdatedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRewardsCycleCreatedEvent(
  rewardsCycleAmount: BigInt,
  rewardsCycleEndTimestamp: BigInt,
  newBpsYieldCapPerSecond: BigInt
): RewardsCycleCreated {
  let rewardsCycleCreatedEvent = changetype<RewardsCycleCreated>(newMockEvent())

  rewardsCycleCreatedEvent.parameters = new Array()

  rewardsCycleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardsCycleAmount",
      ethereum.Value.fromUnsignedBigInt(rewardsCycleAmount)
    )
  )
  rewardsCycleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardsCycleEndTimestamp",
      ethereum.Value.fromUnsignedBigInt(rewardsCycleEndTimestamp)
    )
  )
  rewardsCycleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBpsYieldCapPerSecond",
      ethereum.Value.fromUnsignedBigInt(newBpsYieldCapPerSecond)
    )
  )

  return rewardsCycleCreatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  amount: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWithdrawEvent(
  caller: Address,
  receiver: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}

export function createWithdrawSurplusEvent(
  receiver: Address,
  surplus: BigInt
): WithdrawSurplus {
  let withdrawSurplusEvent = changetype<WithdrawSurplus>(newMockEvent())

  withdrawSurplusEvent.parameters = new Array()

  withdrawSurplusEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawSurplusEvent.parameters.push(
    new ethereum.EventParam(
      "surplus",
      ethereum.Value.fromUnsignedBigInt(surplus)
    )
  )

  return withdrawSurplusEvent
}

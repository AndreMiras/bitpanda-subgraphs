import {
  Approval as ApprovalEvent,
  AssetsClaimed as AssetsClaimedEvent,
  BpsYieldCapPerSecondUpdated as BpsYieldCapPerSecondUpdatedEvent,
  CooldownDurationUpdated as CooldownDurationUpdatedEvent,
  CooldownStarted as CooldownStartedEvent,
  Deposit as DepositEvent,
  DistributeRewards as DistributeRewardsEvent,
  MaximumRewardsCycleDurationUpdated as MaximumRewardsCycleDurationUpdatedEvent,
  Paused as PausedEvent,
  RewardsCycleCreated as RewardsCycleCreatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  Withdraw as WithdrawEvent,
  WithdrawSurplus as WithdrawSurplusEvent
} from "../generated/sVSN/sVSN"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetsClaimed(event: AssetsClaimedEvent): void {
  let entity = new AssetsClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.receiver = event.params.receiver
  entity.assets = event.params.assets

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBpsYieldCapPerSecondUpdated(
  event: BpsYieldCapPerSecondUpdatedEvent
): void {
  let entity = new BpsYieldCapPerSecondUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousBpsYieldCapPerSecond =
    event.params.previousBpsYieldCapPerSecond
  entity.newBpsYieldCapPerSecond = event.params.newBpsYieldCapPerSecond

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCooldownDurationUpdated(
  event: CooldownDurationUpdatedEvent
): void {
  let entity = new CooldownDurationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousDuration = event.params.previousDuration
  entity.newDuration = event.params.newDuration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCooldownStarted(event: CooldownStartedEvent): void {
  let entity = new CooldownStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares
  entity.cooldownEnd = event.params.cooldownEnd

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDistributeRewards(event: DistributeRewardsEvent): void {
  let entity = new DistributeRewards(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.rewards = event.params.rewards

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMaximumRewardsCycleDurationUpdated(
  event: MaximumRewardsCycleDurationUpdatedEvent
): void {
  let entity = new MaximumRewardsCycleDurationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousDuration = event.params.previousDuration
  entity.newDuration = event.params.newDuration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsCycleCreated(
  event: RewardsCycleCreatedEvent
): void {
  let entity = new RewardsCycleCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.rewardsCycleAmount = event.params.rewardsCycleAmount
  entity.rewardsCycleEndTimestamp = event.params.rewardsCycleEndTimestamp
  entity.newBpsYieldCapPerSecond = event.params.newBpsYieldCapPerSecond

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.receiver = event.params.receiver
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawSurplus(event: WithdrawSurplusEvent): void {
  let entity = new WithdrawSurplus(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.surplus = event.params.surplus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

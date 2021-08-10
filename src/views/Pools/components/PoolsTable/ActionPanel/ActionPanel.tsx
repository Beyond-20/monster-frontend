import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useModal, Button, Flex, IconButton, MetamaskIcon, Skeleton, Text, TimerIcon, useTooltip, AddIcon, MinusIcon } from 'uikit'
import { BASE_BSC_SCAN_URL } from 'config'
import { getBscScanLink } from 'utils'
import { useBlock } from 'state/block/hooks'
import { useCakeVault } from 'state/pools/hooks'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { PoolCategory } from 'config/constants/types'
import { getAddress, getCakeVaultAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { convertSharesToCake, getPoolBlockInfo } from 'views/Pools/helpers'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import StakeModal from '../../PoolCard/Modals/StakeModal'
import VaultStakeModal from '../../CakeVaultCard/VaultStakeModal'
import Apr from '../Apr'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: #EAF2F7;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 12px;

  & a {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: #4E4E9D;
    text-decoration: underline;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
}

interface ActionPanelProps {
  account: string
  pool: Pool
  userDataLoaded: boolean
  expanded: boolean
  breakpoints: MediaBreakpoints
}

const ActionValueContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -20px 0 20px;
  & > div {
    width: 100%;
    padding: 0px 8px;
  }
  & p, & b, & span {
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    font-family: 'Red Hat Text', sans-serif;
    letter-spacing: 0.01em;
    color: #4E4E9D;
  }
  & p b {
    font-weight: bold;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      width: 33.33%;
      padding: 0 20px;
    }
  }
`

const InfoSection = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
`

const ActionSection = styled.div`
  width: 33.33%;
  display: flex;
  margin-top: 8px;
  justify-content: flex-end;
`

const ActionButtonsContainer = styled.div `
  display: flex;
  margin-left: 12px;
  & button {
    height: 40px;
    font-size: 14px;
    background: #49468A;
    border: none;
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
    & svg {
      fill: white;
    }
  }
`

const ActionPanel: React.FC<ActionPanelProps> = ({ account, pool, userDataLoaded, expanded, breakpoints }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
    isAutoVault,
  } = pool
  const { t } = useTranslation()
  const poolContractAddress = getAddress(contractAddress)
  const cakeVaultContractAddress = getCakeVaultAddress()
  const { currentBlock } = useBlock()
  const { isXs, isSm, isMd } = breakpoints
  const showSubtitle = (isXs || isSm) && sousId === 0

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const isMetaMaskInScope = !!window.ethereum?.isMetaMask
  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''

  const {
    totalCakeInVault,
    fees: { performanceFee },
  } = useCakeVault()

  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  const isManualCakePool = sousId === 0

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  // const {
  //   targetRef: totalStakedTargetRef,
  //   tooltip: totalStakedTooltip,
  //   tooltipVisible: totalStakedTooltipVisible,
  // } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
  //   placement: 'bottom',
  // })

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )

  // const {
  //   targetRef: tagTargetRef,
  //   tooltip: tagTooltip,
  //   tooltipVisible: tagTooltipVisible,
  // } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
  //   placement: 'bottom-start',
  // })

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t("You've already staked the maximum amount you can stake in this pool!"),
    { placement: 'bottom' },
  )

  const maxStakeRow = stakingLimit.gt(0) ? (
    <Flex mb="8px" justifyContent="space-between">
      <Text>{t('Max. stake per user')}:</Text>
      <Text>{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${stakingToken.symbol}`}</Text>
    </Flex>
  ) : null

  const {
    userData: { userShares },
    pricePerFullShare,
  } = useCakeVault()

  const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
  const stakingTokenBalance = pool.userData?.stakingTokenBalance ? new BigNumber(pool.userData.stakingTokenBalance) : BIG_ZERO
  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)

  const blocksRow =
    blocksRemaining || blocksUntilStart ? (
      <Flex mb="8px" justifyContent="space-between">
        <Text>{hasPoolStarted ? t('Ends in') : t('Starts in')}:</Text>
        <Flex>
          <a
            href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}
            target="_blank"
            rel="noreferrer"
          >
            <Balance fontSize="16px" value={blocksToDisplay} decimals={0} color="primary" />
            <Text ml="4px" color="primary" textTransform="lowercase">
              {t('Blocks')}
            </Text>
            <TimerIcon ml="4px" color="primary" />
          </a>
        </Flex>
      </Flex>
    ) : (
      <Skeleton width="56px" height="16px" />
    )

  const aprRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text>{isAutoVault ? t('APY') : t('APR')}:</Text>
      <Apr pool={pool} showIcon performanceFee={isAutoVault ? performanceFeeAsDecimal : 0} />
    </Flex>
  )

  const totalStakedRow = (
    <div>
      <p>{t('Total staked:')}</p>
      {totalStaked && totalStaked.gte(0) ? (
        <Balance value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
      ) : (
        <Skeleton width="56px" height="16px" />
      )}
        {/* {totalStakedTooltipVisible && totalStakedTooltip} */}
    </div>
  )

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={pool.stakingTokenPrice}
    />,
  )

  const [onPresentVaultStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={pool.stakingTokenPrice}
      isRemovingStake
    />,
  )

  const [onPresentVaultUnstake] = useModal(<VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />)
  const reachStakingLimit = pool.stakingLimit.gt(0) && pool.userData.stakedBalance.gte(pool.stakingLimit)
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const onStake = () => {
    if (isAutoVault) {
      onPresentVaultStake()
    } else {
      onPresentStake()
    }
  }

  const onUnstake = () => {
    if (isAutoVault) {
      onPresentVaultUnstake()
    } else {
      onPresentUnstake()
    }
  }

  return (
    <StyledActionPanel expanded={expanded}>
      <ActionValueContainer>
        <InfoSection>
          {maxStakeRow}
          {totalStakedRow}
          {shouldShowBlockCountdown && blocksRow}
          <div>
            <p>Stake:</p>
            <p>{ stakingToken.symbol }</p>
          </div>
          <div>
            <p>Deposit Fees:</p>
            <p>0%</p>
          </div>
          <div>
            <p>Harvest Fees:</p>
            <p>0%</p>
          </div>
          <div>
            <p>Staked Value:</p>
            <p>$9.12</p>
          </div>
          <div>
            <p>Earned Value:</p>
            <p>$0.00</p>
          </div>
          {/* <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <a href={`https://pancakeswap.info/token/${getAddress(earningToken.address)}`}>{t('See Token Info')}</a>
          </Flex> */}
          {/* {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag />}
          {tagTooltipVisible && tagTooltip}
          <span ref={tagTargetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
          </span> */}
        </InfoSection>
        <ActionSection>
          <Flex flexDirection='column' alignItems='center'>
            <p>Staked</p>
            <p><b>0</b></p>
          </Flex>
          <ActionButtonsContainer>
            <Button>Harvest</Button>
            <IconButton variant="secondary" onClick={onUnstake}>
              <MinusIcon color="primary" width="14px" />
            </IconButton>
            {reachStakingLimit ? (
              <span ref={targetRef}>
                <IconButton variant="secondary" disabled>
                  <AddIcon />
                </IconButton>
              </span>
            ) : (
              <IconButton
                variant="secondary"
                onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
                disabled={pool.isFinished}
              >
                <AddIcon />
              </IconButton>
            )}
          </ActionButtonsContainer>
        </ActionSection>
      </ActionValueContainer>
      {poolContractAddress && (
        <Flex mb="8px" justifyContent='center'>
          <a href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? cakeVaultContractAddress : poolContractAddress}`} target='_blank' rel='noreferrer'>
            {t('View on BSCscan')}
          </a>
        </Flex>
      )}
      <Flex mb="8px" justifyContent='center'>
        <a href={earningToken.projectLink} target='_blank' rel='noreferrer'>{t('View Project Site')}</a>
      </Flex>
      {/* {account && isMetaMaskInScope && tokenAddress && (
        <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
          >
            <Text color="primary">{t('Add to Metamask')}</Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )} */}
      {/* <ActionContainer>
        {showSubtitle && (
          <Text mt="4px" mb="16px" color="textSubtle">
            {isAutoVault ? t('Automatic restaking') : `${t('Earn')} CAKE ${t('Stake').toLocaleLowerCase()} CAKE`}
          </Text>
        )}
        <Harvest {...pool} userDataLoaded={userDataLoaded} />
        <Stake pool={pool} userDataLoaded={userDataLoaded} />
      </ActionContainer> */}
    </StyledActionPanel>
  )
}

export default ActionPanel

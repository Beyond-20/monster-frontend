import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { Flex, MetamaskIcon, Text, TooltipText, TimerIcon, Skeleton, useTooltip, Button, HelpIcon } from 'uikit'
import { BASE_BSC_SCAN_URL } from 'config'
import { useBlock } from 'state/block/hooks'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { getAddress, getCakeVaultAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import { getBscScanLink } from 'utils'
import Balance from 'components/Balance'
import { getPoolBlockInfo } from 'views/Pools/helpers'

interface ExpandedFooterProps {
  pool: Pool
  account: string
}

const ExpandedWrapper = styled(Flex)`
  padding: 16px !important;
  svg {
    height: 14px;
    width: 14px;
  }
  & a {
    font-size: 14px;
    color: #4E4E9D;
    letter-spacing: 0.01em;
    text-decoration: underline;
    margin-top: 8px;
  }
`

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  & p, & span {
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: #4E4E9D;
  }
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const {
    totalCakeInVault,
    fees: { performanceFee },
  } = useCakeVault()

  const {
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
    sousId,
    isAutoVault,
  } = pool

  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''
  const poolContractAddress = getAddress(contractAddress)
  const cakeVaultContractAddress = getCakeVaultAddress()
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask
  const isManualCakePool = sousId === 0

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

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

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
    placement: 'bottom',
  })

  return (
    <ExpandedWrapper flexDirection="column">
      <FooterRow>
        <p>{t('Total staked')}:</p>
        <Flex alignItems="flex-start">
          {totalStaked && totalStaked.gte(0) ? (
            <>
              <Balance small value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
              {/* <span ref={totalStakedTargetRef}>
                <HelpIcon color="textSubtle" width="20px" ml="6px" mt="4px" />
              </span> */}
            </>
          ) : (
            <Skeleton width="90px" height="21px" />
          )}
          {totalStakedTooltipVisible && totalStakedTooltip}
        </Flex>
      </FooterRow>
      <FooterRow>
        <p>{t('Stake')}:</p>
        <p>{ pool.stakingToken.symbol }</p>
      </FooterRow>
      <FooterRow>
        <p>{t('Deposit Fees')}:</p>
        <p>0%</p>
      </FooterRow>
      <FooterRow>
        <p>{t('Harvest Fees')}:</p>
        <p>0%</p>
      </FooterRow>
      <FooterRow>
        <p>{t('Staked Value')}:</p>
        <p>$0</p>
      </FooterRow>
      <FooterRow>
        <p>{t('Earned Value')}:</p>
        <p>$0.00</p>
      </FooterRow>
      {stakingLimit && stakingLimit.gt(0) && (
        <FooterRow>
          <p>{t('Max. stake per user')}:</p>
          <p>{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${stakingToken.symbol}`}</p>
        </FooterRow>
      )}
      {shouldShowBlockCountdown && (
        <FooterRow>
          <p>{hasPoolStarted ? t('Ends in') : t('Starts in')}:</p>
          {blocksRemaining || blocksUntilStart ? (
            <Flex alignItems="center">
              <a
                href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}
                target="_blank"
                rel="noreferrer"
              >
                <Balance small value={blocksToDisplay} decimals={0} color="primary" />
                <Text small ml="4px" color="primary" textTransform="lowercase">
                  {t('Blocks')}
                </Text>
                <TimerIcon ml="4px" color="primary" />
              </a>
            </Flex>
          ) : (
            <Skeleton width="54px" height="21px" />
          )}
        </FooterRow>
      )}
      {isAutoVault && (
        <FooterRow>
          {tooltipVisible && tooltip}
          <TooltipText ref={targetRef} small>
            {t('Performance Fee')}
          </TooltipText>
          <p>
            {performanceFee / 100}%
          </p>
        </FooterRow>
      )}
      <Flex justifyContent='center'>
        <a href={`https://pancakeswap.info/token/${getAddress(earningToken.address)}`} target='_blank' rel='noreferrer'>{t('View on Bscscan')}</a>
      </Flex>
      <Flex justifyContent='center'>
        <a href={earningToken.projectLink} target='_blank' rel='noreferrer'>{t('View Project Site')}</a>
      </Flex>
      {/* {poolContractAddress && (
        <Flex justifyContent='center'>
          <a href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? cakeVaultContractAddress : poolContractAddress}`} target='_blank' rel='noreferrer'>
            {t('View Contract')}
          </a>
        </Flex>
      )} */}
      {/* {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
          >
            <Text color="primary" fontSize="14px">
              {t('Add to Metamask')}
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )} */}
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)

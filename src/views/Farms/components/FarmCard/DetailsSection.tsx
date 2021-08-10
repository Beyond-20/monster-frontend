import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Flex, Skeleton } from 'uikit'
import Balance from 'components/Balance'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser, useLpTokenPrice } from 'state/farms/hooks'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
  details: any
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled.a`
  font-weight: 400;
  color: #4E4E9D;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  margin-top: 8px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  & p, & span {
    font-family: 'Red Hat Text', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: #4E4E9D;
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
  details
}) => {
  const { t } = useTranslation()
  const { stakedBalance } = useFarmUser(details.pid)
  const lpPrice = useLpTokenPrice(details.lpSymbol)

  return (
    <Wrapper>
      <InfoRow>
        <p>{t('Total Liquidity')}</p>
        {totalValueFormatted ? <p>{totalValueFormatted}</p> : <Skeleton width={75} height={25} />}
      </InfoRow>
      <InfoRow>
        <p>Multiplier:</p>
        <p>{ details.multiplier }</p>
      </InfoRow>
      <InfoRow>
        <p>Stake:</p>
        <p>{ lpLabel }</p>
      </InfoRow>
      <InfoRow>
        <p>Deposit Fees:</p>
        <p>0%</p>
      </InfoRow>
      <InfoRow>
        <p>Harvest Fees:</p>
        <p>0%</p>
      </InfoRow>
      <InfoRow>
        <p>Staked Value:</p>
        {stakedBalance.gt(0) && lpPrice.gt(0) ? (
        <Balance
          fontSize="12px"
          color="textSubtle"
          decimals={2}
          value={getBalanceNumber(lpPrice.times(stakedBalance))}
          unit=" USD"
          prefix="~"
        />
        ) : (
          <p>0 USD</p>
        )}
      </InfoRow>
      <InfoRow>
        <p>Earned Value:</p>
        <p>0 USD</p>
      </InfoRow>
      <Flex justifyContent='center'>
        <StyledLinkExternal href={bscScanAddress} target='_blank'>{t('View on BSCSCAN')}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent='center'>
        <StyledLinkExternal href='' target='_blank'>{t('View Project Site')}</StyledLinkExternal>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection

import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex } from 'uikit'
import Balance from 'components/Balance'
import { useFarmUser, useLpTokenPrice } from 'state/farms/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
// import { CommunityTag, CoreTag, DualTag } from 'components/Tags'

import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
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

const InfoContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40%;
  }
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  & p, & span {
    font-family: 'Red Hat Text', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #4E4E9D;
    line-height: 19px;
    letter-spacing: 0.01em;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details

  const { t } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const { stakedBalance } = useFarmUser(details.pid)
  const lpPrice = useLpTokenPrice(farm.lpSymbol)
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `/pool/${lpAddress}`

  return (
    <Container expanded={expanded}>
      <InfoContainer>
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
        {/* {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`/add/${liquidityUrlPathParts}`}>
              {t('Get %symbol%', { symbol: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )} */}
        <Flex justifyContent='center'>
          <StyledLinkExternal href={bsc} target='_blank'>{t('View on BSCSCAN')}</StyledLinkExternal>
        </Flex>
        <Flex justifyContent='center'>
          <StyledLinkExternal href='' target='_blank'>{t('View Project Site')}</StyledLinkExternal>
        </Flex>
        {/* <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal> */}
        {/* <TagsContainer>
          {farm.isCommunity ? <CommunityTag /> : <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer> */}
      </InfoContainer>
      {/* <ValueContainer>
        <ValueWrapper>
          <Text>{t('APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer> */}
      <ActionContainer>
        <StakedAction {...farm} userDataReady={userDataReady} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel

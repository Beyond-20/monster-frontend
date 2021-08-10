import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text, useMatchBreakpoints } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import tokens from 'config/constants/tokens'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { ReactComponent as ArrowDown } from 'assets/images/ArrowDown.svg'
import { ReactComponent as ArrowUp } from 'assets/images/ArrowUp.svg'
import AprRow from '../PoolCard/AprRow'
import { StyledCardContent, StyledCardBody, StyledCard, StyledCardInner } from '../PoolCard/StyledCard'
import ExpandedFooter from '../PoolCard/CardFooter/ExpandedFooter'
import { PoolTokenPairImage } from '../PoolsTable/Cells/PoolTokenPairImage'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'

interface CakeVaultProps {
  pool: Pool
  showStakedOnly: boolean
}

const ArrowWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const [ isExpanded, setIsExpanded ] = useState(false);
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useCakeVault()

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isPromoted={{ isDesktop: isXl }}>
      <StyledCardInner>
        <StyledCardBody>
          <PoolTokenPairImage isAuto={pool.isAutoVault} primaryToken={pool.earningToken} secondaryToken={pool.stakingToken} mr="8px" width={40} height={40} />
          <StyledCardContent>
            <AprRow pool={pool} performanceFee={performanceFeeAsDecimal} />
            <Flex mt='8px'>
              <Box>
                <Box>
                  <RecentCakeProfitRow />
                </Box>
                <Box mt="8px">
                  <UnstakingFeeCountdownRow />
                </Box>
              </Box>
              <Flex>
                {account ? (
                  <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
                ) : (
                  <ConnectWalletButton />
                )}
                <ArrowWrapper onClick={() => { setIsExpanded(!isExpanded) }}>
                  { isExpanded ? <ArrowUp /> : <ArrowDown /> }
                </ArrowWrapper>
              </Flex>
            </Flex>
          </StyledCardContent>
        </StyledCardBody>
        { isExpanded && <ExpandedFooter pool={pool} account={account} /> }
      </StyledCardInner>
    </StyledCard>
  )
}

export default CakeVaultCard

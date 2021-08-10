import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { CardBody, Flex, Text, CardRibbon } from 'uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import AprRow from './AprRow'
import { StyledCardContent, StyledCardBody, StyledCard, StyledCardInner } from './StyledCard'
import ExpandedFooter from './CardFooter/ExpandedFooter'
import { PoolTokenPairImage } from '../PoolsTable/Cells/PoolTokenPairImage'
import CardActions from './CardActions'

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData, isAutoVault } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardInner>
        <StyledCardBody>
          <PoolTokenPairImage isAuto={isAutoVault} primaryToken={earningToken} secondaryToken={stakingToken} mr="8px" width={40} height={40} />
          <StyledCardContent>
            <AprRow pool={pool} />
            <Flex mt="8px" flexDirection="column">
              {account ? (
                <CardActions isExpanded={isExpanded} pool={pool} stakedBalance={stakedBalance} setExpanded={() => { setIsExpanded(!isExpanded) }} />
              ) : (
                <>
                  <p>
                    {t('Start earning')}
                  </p>
                  <ConnectWalletButton />
                </>
              )}
            </Flex>
          </StyledCardContent>
        </StyledCardBody>
        { isExpanded && <ExpandedFooter pool={pool} account={account} /> }
      </StyledCardInner>
    </StyledCard>
  )
}

export default PoolCard

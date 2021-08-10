import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: Pool
  stakedBalance: BigNumber
  isExpanded: boolean
  setExpanded: () => void
}

const CardActions: React.FC<CardActionsProps> = ({ pool, stakedBalance, isExpanded, setExpanded }) => {
  const { sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <HarvestActions
            earnings={earnings}
            earningToken={earningToken}
            sousId={sousId}
            earningTokenPrice={earningTokenPrice}
            isBnbPool={isBnbPool}
            isLoading={isLoading}
            needsApproval={needsApproval}
            pool={pool}
            isExpanded={isExpanded}
            setExpanded={setExpanded}
          />
        )}
        {isExpanded && !needsApproval && <StakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isBnbPool={isBnbPool}
            isStaked={isStaked}
          />
        }
      </Flex>
    </Flex>
  )
}

export default CardActions

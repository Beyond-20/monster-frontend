import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import VaultApprovalAction from './VaultApprovalAction'
import VaultStakeActions from './VaultStakeActions'
import { useCheckVaultApprovalStatus } from '../../../hooks/useApprove'

const InlineText = styled(Text)`
  display: inline;
`

const CakeVaultCardActions: React.FC<{
  pool: Pool
  accountHasSharesStaked: boolean
  isLoading: boolean
}> = ({ pool, accountHasSharesStaked, isLoading }) => {
  const { stakingToken, userData } = pool
  const { t } = useTranslation()
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus()

  return (
    <Flex flexDirection="column">
      {isVaultApproved ? (
        <VaultStakeActions
          isLoading={isLoading}
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          accountHasSharesStaked={accountHasSharesStaked}
        />
      ) : (
        <VaultApprovalAction isLoading={isLoading} setLastUpdated={setLastUpdated} />
      )}
    </Flex>
  )
}

export default CakeVaultCardActions

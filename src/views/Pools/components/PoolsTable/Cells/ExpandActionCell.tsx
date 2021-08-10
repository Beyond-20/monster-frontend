import React from 'react'
import styled from 'styled-components'
import { Button } from 'uikit'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { ReactComponent as ArrowDown } from 'assets/images/ArrowDown.svg'
import { ReactComponent as ArrowUp } from 'assets/images/ArrowUp.svg'
import { PoolCategory } from 'config/constants/types'
import { useCheckVaultApprovalStatus } from '../../../hooks/useApprove'
import BaseCell from './BaseCell'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout: boolean
  account: any
  pool: any
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  & button {
    background: #49468A;
    height: 40px;
    margin-right: 10px;
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1 0 150px;
    padding-right: 32px;
    padding-left: 8px;
  }
`

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded, account, pool, userDataLoaded, isFullLayout }) => {
  const { t } = useTranslation()
  const { isVaultApproved } = useCheckVaultApprovalStatus()
  const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
  const allowance = pool.userData?.allowance ? new BigNumber(pool.userData.allowance) : BIG_ZERO
  const needsApproval = pool.isAutoVault ? !isVaultApproved : !allowance.gt(0) && !isBnbPool
  const actionButtons = () => (
    <>
    {account ?
      needsApproval ? 
        <Button>{t('Enable')}</Button>
        :
        <Button>{t('Compound')}</Button>
      :
      <ConnectWalletButton width="100%" />
    }
    </>
  )
  return (
    <StyledCell role="cell">
      { isFullLayout && actionButtons()}
      { expanded ? <ArrowUp /> : <ArrowDown /> }
    </StyledCell>
  )
}

export default TotalStakedCell

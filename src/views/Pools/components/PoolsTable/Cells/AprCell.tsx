import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from 'uikit'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'

interface AprCellProps {
  pool: Pool
  performanceFee: number
}

const StyledCell = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  & span {
    font-family: 'Red Hat Text', sans-serif;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: #4E4E9D;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 80px;
  }
`

const AprCell: React.FC<AprCellProps> = ({ pool, performanceFee }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { isAutoVault } = pool
  return (
    <StyledCell role="cell">
      {/* <Text fontSize="12px" color="textSubtle" textAlign="left">
        {isAutoVault ? t('APY') : t('APR')}
      </Text> */}
      <Apr pool={pool} performanceFee={isAutoVault ? performanceFee : 0} showIcon={!isXs && !isSm} />
    </StyledCell>
  )
}

export default AprCell

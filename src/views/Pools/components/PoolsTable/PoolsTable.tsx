import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon, useMatchBreakpoints } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import PoolRow from './PoolRow'

interface PoolsTableProps {
  pools: Pool[]
  userDataLoaded: boolean
  account: string
}

const StyledTable = styled.div`
  background-color: transparent;
`

const StyledTableBorder = styled.div`
  padding: 1px 1px 3px 1px;
  background-size: 400% 400%;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 45px;
  border-radius: 60px;
  background: white;
  filter: ${({ theme }) => theme.card.dropShadow};
  & div {
    color: #464486;
  }
`

const StyledCell = styled.div`
  flex: 5;
  flex-direction: row;
  padding: 0 4px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding: 0 20px;
  }
`

const PoolsTable: React.FC<PoolsTableProps> = ({ pools, userDataLoaded, account }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <StyledTableBorder>
      <StyledTable role="table" ref={tableWrapperEl}>
        <StyledRow>
          <StyledCell style={{ flex: '1 0 130px' }}>HOT</StyledCell>
          {isXl && <StyledCell>LP</StyledCell>}
          <StyledCell style={{ flex: '1 0 80px' }}>APR</StyledCell>
          {isXl && <StyledCell>Liquidity</StyledCell>}
          <StyledCell style={{ textAlign: 'left' }}>Earned</StyledCell>
          <StyledCell />
        </StyledRow>
        {pools.map((pool) => (
          <PoolRow
            key={pool.isAutoVault ? 'auto-cake' : pool.sousId}
            pool={pool}
            account={account}
            userDataLoaded={userDataLoaded}
          />
        ))}
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </StyledTable>
    </StyledTableBorder>
  )
}

export default PoolsTable

import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'uikit'
import { Pool } from 'state/types'
import { useCakeVault } from 'state/pools/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'

interface PoolRowProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  cursor: pointer;
  background: #EAF2F7;
  border-radius: 10px;
  margin-top: 15px;
  & > div {
    padding: 8px 4px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      padding: 8px 20px;
    }
  }
`

const LPWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #4E4E9D;
  flex: 1 0 150px;
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const {
    fees: { performanceFee },
  } = useCakeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded} style={{ borderBottomLeftRadius: expanded ? 0 : 10, borderBottomRightRadius: expanded ? 0 : 10 }}>
        <NameCell pool={pool} />
        {isXl && <LPWrapper>
          { pool.earningToken.symbol } - { pool.stakingToken.symbol }
        </LPWrapper> }
        <AprCell pool={pool} performanceFee={performanceFeeAsDecimal} />
        {(isLg || isXl) && <TotalStakedCell pool={pool} />}
        {/* {isXl && <EndsInCell pool={pool} />} */}
        <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        <ExpandActionCell account={account} pool={pool} userDataLoaded={userDataLoaded} expanded={expanded} isFullLayout={isMd || isLg || isXl} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
        />
      )}
    </>
  )
}

export default PoolRow

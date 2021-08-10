import React from 'react'
import styled from 'styled-components'
import { Button, useMatchBreakpoints } from 'uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { ReactComponent as ArrowDown } from 'assets/images/ArrowDown.svg'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import HarvestButton from '../FarmCard/HarvestButton'

interface DetailsProps {
  details: FarmWithStakedValue
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  & button {
    background: #49468a;
    border-radius: 16px;
    padding: 0;
    height: 40px;
    width: 159px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  & svg {
    margin-left: 16px;
    & path {
      fill: #464486;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const Details: React.FC<DetailsProps> = ({ details }) => {
  const farm = details
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const { account } = useWeb3React()
  let earnings = BIG_ZERO
  const earningsBigNumber = new BigNumber(farm.userData.earnings)
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
  }

  return (
    <Container>
      {!isMobile && !account && <Button>Unlock Wallet</Button>}
      {!isMobile && account && <HarvestButton earnings={earnings} pid={farm.pid} />}
      <ArrowDown />
    </Container>
  )
}

export default Details

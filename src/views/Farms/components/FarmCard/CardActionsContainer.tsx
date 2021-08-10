import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text } from 'uikit'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import useApproveFarm from '../../hooks/useApproveFarm'

const Action = styled.div`
  padding-top: 16px;
  flex: 1;
  & button {
    background: #49468A;
    height: 40px;
    font-size: 14px;
    margin-top: 0;
    & svg {
      fill: white;
    }
  }
`
export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  expanded: boolean
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl, expanded }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button mt="8px" disabled={requestedApproval} onClick={handleApprove}>
        {t('Enable')}
      </Button>
    )
  }

  return (
    <Action>
      {isApproved && stakedBalance.gt(0) ?
        <HarvestAction earnings={earnings} pid={pid} />
        :
        (
          <Flex flex={1} justifyContent='space-between' alignItems='center'>
            {
              !isApproved &&
                <div style={{ textAlign: 'left' }}>
                  <p>Banana Earned</p>
                  <h2>?</h2>
                </div>
            }
            { !account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton() }
          </Flex>
        )
      }
      { expanded && isApproved && stakedBalance.gt(0) && renderApprovalOrStakeButton() }
    </Action>
  )
}

export default CardActions

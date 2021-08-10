import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'uikit'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import useHarvestFarm from '../../hooks/useHarvestFarm'

interface HarvestButtonProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestButton: React.FC<HarvestButtonProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO

  return (
    <Button
      disabled={rawEarningsBalance.eq(0) || pendingTx}
      onClick={async () => {
        setPendingTx(true)
        try {
          await onReward()
          toastSuccess(
            `${t('Harvested')}!`,
            t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' }),
          )
        } catch (e) {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
          console.error(e)
        } finally {
          setPendingTx(false)
        }
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      }}
    >
      {t('Harvest')}
    </Button>
  )
}

export default HarvestButton

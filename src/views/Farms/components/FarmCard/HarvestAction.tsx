import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Heading, Text } from 'uikit'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import HarvestButton from './HarvestButton'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const cakePrice = usePriceCakeBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const { t } = useTranslation()
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <p>{ t('Banana Earned') }</p>
        <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        {/* {earningsBusd > 0 && (
          <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
        )} */}
      </Flex>
      <HarvestButton earnings={earnings} pid={pid} />
    </Flex>
  )
}

export default HarvestAction

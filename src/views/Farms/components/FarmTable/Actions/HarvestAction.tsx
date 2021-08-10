import React from 'react'
import { Heading, Skeleton, Text } from 'uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useTranslation } from 'contexts/Localization'
import HarvestButton from '../../FarmCard/HarvestButton'

import { ActionContainer, ActionTitles, ActionContent } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceCakeBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const { t } = useTranslation()

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
          CAKE
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Earned')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading>{displayBalance}</Heading>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
        <HarvestButton earnings={earnings} pid={pid} />
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction

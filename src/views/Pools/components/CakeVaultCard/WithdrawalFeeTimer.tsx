import React from 'react'
import { Text } from 'uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'

const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  const { t } = useTranslation()
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <p>{t('%day%d : %hour%h : %minute%m', { day: days, hour: hours, minute: minutes })}</p>
}

export default WithdrawalFeeTimer

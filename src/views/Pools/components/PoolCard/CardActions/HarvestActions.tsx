import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Heading, useModal, Skeleton } from 'uikit'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { ReactComponent as ArrowDown } from 'assets/images/ArrowDown.svg'
import { ReactComponent as ArrowUp } from 'assets/images/ArrowUp.svg'
import ApprovalAction from './ApprovalAction'
import CollectModal from '../Modals/CollectModal'

interface HarvestActionsProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isBnbPool: boolean
  isLoading?: boolean
  needsApproval: boolean
  pool: any
  isExpanded: boolean,
  setExpanded: () => void
}

const ArrowWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  earningToken,
  sousId,
  isBnbPool,
  earningTokenPrice,
  isLoading = false,
  needsApproval,
  pool,
  isExpanded,
  setExpanded
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width="80px" height="48px" />
        ) : (
          <>
            <p>{t('Earned')}</p>
            {hasEarnings ? (
              <>
                <Balance decimals={5} value={earningTokenBalance} />
                {/* {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )} */}
              </>
            ) : (
              <>
                <span>0</span>
                {/* <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text> */}
              </>
            )}
          </>
        )}
      </Flex>
      <Flex>
        {
          needsApproval && <ApprovalAction pool={pool} isLoading={isLoading} />
        }
        { hasEarnings &&
          <Button onClick={onPresentCollect}>
            {/* {isCompoundPool ? t('Collect') : t('Harvest')} */}
            { t('Compound') }
          </Button>    
        }
        <ArrowWrapper onClick={setExpanded}>
          { isExpanded ? <ArrowUp /> : <ArrowDown /> }
        </ArrowWrapper>
      </Flex>
    </Flex>
  )
}

export default HarvestActions

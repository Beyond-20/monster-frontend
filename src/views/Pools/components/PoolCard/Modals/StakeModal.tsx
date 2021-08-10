import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Image, Button, Slider, BalanceInput, AutoRenewIcon } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import PercentageButton from './PercentageButton'
import useStakePool from '../../../hooks/useStakePool'
import useUnstakePool from '../../../hooks/useUnstakePool'

interface StakeModalProps {
  isBnbPool: boolean
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  onDismiss?: () => void
}

const StyledLink = styled.a`
  width: 100%;
`

const InputWrapper = styled.div`
  background: rgba(73, 70, 138, 0.2);
  border-radius: 10px;
  padding: 12px;
  & p, & input {
    font-size: 20px;
    line-height: 31px;
    color: #524F9E;
    text-align: right;
    font-family: 'Red Hat Text', sans-serif;
  }
  & > p {
    margin-bottom: 12px;
  }
  & input {
    text-align: left;
    margin-right: 6px;
    font-size: 16px;
  }
  & h1 {
    font-size: 20px;
    margin-left: 8px;
    color: #524F9E;
  }
  & button {
    background: #49468A;
    border-radius: 10px;
    height: 40px;
    font-size: 14px;
  }
  & > div > div {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    & > div {
      display: none;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  & button {
    margin: 0 12px;
    font-size: 16px;
    &.secondary {
      border: 1px solid #49468A;
      color: #524F9E;
    }
    &.primary {
      background: #49468A;
    }
  }
`

const StakeModal: React.FC<StakeModalProps> = ({
  isBnbPool,
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  isRemovingStake = false,
  onDismiss,
}) => {
  const { sousId, stakingToken, userData, stakingLimit, earningToken } = pool
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { onStake } = useStakePool(sousId, isBnbPool)
  const { onUnstake } = useUnstakePool(sousId, pool.enableEmergencyWithdraw)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const [percent, setPercent] = useState(0)
  const getCalculatedStakingLimit = () => {
    if (isRemovingStake) {
      return userData.stakedBalance
    }
    return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit) ? stakingLimit : stakingTokenBalance
  }

  const usdValueStaked = stakeAmount && formatNumber(new BigNumber(stakeAmount).times(stakingTokenPrice).toNumber())

  useEffect(() => {
    if (stakingLimit.gt(0) && !isRemovingStake) {
      const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
      setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit))
    }
  }, [stakeAmount, stakingLimit, userData, stakingToken, isRemovingStake, setHasReachedStakedLimit])

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
      const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
      setPercent(Math.min(percentage, 100))
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
      const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
      setStakeAmount(amountToStake)
    } else {
      setStakeAmount('')
    }
    setPercent(sliderPercent)
  }

  const handleConfirmClick = async () => {
    setPendingTx(true)

    if (isRemovingStake) {
      // unstaking
      try {
        await onUnstake(stakeAmount, stakingToken.decimals)
        toastSuccess(
          `${t('Unstaked')}!`,
          t('Your %symbol% earnings have also been harvested to your wallet!', {
            symbol: earningToken.symbol,
          }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingTx(false)
      }
    } else {
      try {
        // staking
        await onStake(stakeAmount, stakingToken.decimals)
        toastSuccess(
          `${t('Staked')}!`,
          t('Your %symbol% funds have been staked in the pool!', {
            symbol: stakingToken.symbol,
          }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingTx(false)
      }
    }
  }

  return (
    <Modal
      title={(isRemovingStake ? t('Unstake ') : t('Stake ')) + stakingToken.symbol}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {stakingLimit.gt(0) && !isRemovingStake && (
        <Text color="secondary" bold mb="24px" style={{ textAlign: 'center' }} fontSize="16px">
          {t('Max stake for this pool: %amount% %token%', {
            amount: getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0),
            token: stakingToken.symbol,
          })}
        </Text>
      )}
      {/* <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isRemovingStake ? t('Unstake') : t('Stake')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${getAddress(stakingToken.address)}.png`}
            width={24}
            height={24}
            alt={stakingToken.symbol}
          />
          <Text ml="4px" bold>
            {stakingToken.symbol}
          </Text>
        </Flex>
      </Flex> */}
      <InputWrapper>
        <p>
          {t('Balance: %balance%', {
            balance: Number(getFullDisplayBalance(getCalculatedStakingLimit(), stakingToken.decimals)).toFixed(4),
          })}
        </p>
        <Flex alignItems='center'>
          <BalanceInput
            value={stakeAmount}
            onUserInput={handleStakeInputChange}
            currencyValue={stakingTokenPrice !== 0 && `~${usdValueStaked || 0} USD`}
            isWarning={hasReachedStakeLimit}
            decimals={stakingToken.decimals}
          />
          <Button onClick={() => handleChangePercent(100)}>Max</Button>
          <h1>{ stakingToken.symbol }</h1>
        </Flex>
      </InputWrapper>
      {hasReachedStakeLimit && (
        <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
          {t('Maximum total stake: %amount% %token%', {
            amount: getFullDisplayBalance(new BigNumber(stakingLimit), stakingToken.decimals, 0),
            token: stakingToken.symbol,
          })}
        </Text>
      )}
      {/* <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name="stake"
        valueLabel={`${percent}%`}
        step={1}
      />
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
      </Flex> */}
      <ButtonWrapper>
        <Button variant='secondary' className='secondary'>
          { t('Cancel') }
        </Button>
        <Button
          className='primary'
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit}
          mt="24px"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ButtonWrapper>
      {/* {!isRemovingStake && (
        <StyledLink href="/swap">
          <Button width="100%" mt="8px" variant="secondary">
            {t('Get %symbol%', { symbol: stakingToken.symbol })}
          </Button>
        </StyledLink>
      )} */}
    </Modal>
  )
}

export default StakeModal

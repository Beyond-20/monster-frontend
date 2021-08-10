import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'bignumber.js'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: rgba(73, 70, 138, 0.2);
  padding: 24px 16px 20px 0;
  border-radius: 16px;
  margin-bottom: 12px;
  width: 100%;
  & p {
    font-family: 'Red Hat Text', sans-serif;
    font-size: 24px;
    line-height: 31px;
    color: #524F9E;
    font-weight: bold;
  }
  & h1 {
    font-size: 24px;
    line-height: 31px;
    color: #524F9E;
  }
  & button {
    background: #49468A;
    box-shadow: none;
    height: 40px;
    font-size: 14px;
    border-radius: 10px;
  }
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 24px;
  border: none;
  background: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  font-family: 'Red Hat Text', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 31px;
  color: #EA0000;
  a {
    display: inline;
    font-family: 'Red Hat Text', sans-serif;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <p>{inputTitle}</p>
          <p>{t('Balance: %balance%', { balance: displayBalance(max) })}</p>
        </Flex>
        <Flex alignItems="center" justifyContent="space-around" mt={16}>
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Button scale="sm" onClick={onSelectMax} mr="8px">
            {t('Max')}
          </Button>
          <h1>{symbol}</h1>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage color="failure">
          {t('No tokens to stake')}:{' '}
          <a href={addLiquidityUrl} target="_blank" rel="noreferrer">
            {t('Get %symbol%', { symbol })}
          </a>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput

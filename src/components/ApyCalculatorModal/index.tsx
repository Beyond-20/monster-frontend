import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Box, LinkExternal } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apr: number
  displayApr?: string
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
  isFarm?: boolean
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`
const ROIContainer=styled.div`
  & p {
    font-family: 'Red Hat Text', sans-serif;
    font-size: 16px;
    line-height: 28px;
    color: #524F9E;
    font-weight: 700;
  }
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apr,
  displayApr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'CAKE',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
  isFarm = false,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={t('ROI')} onDismiss={onDismiss}>
      {/* {isFarm && (
        <Box>
          <Flex mb="8px" justifyContent="space-between">
            <Text small color="textSubtle">
              {t('APR (incl. LP rewards)')}
            </Text>
            <Text small>{displayApr}%</Text>
          </Flex>
          <Flex mb="24px" justifyContent="space-between">
            <Text small color="textSubtle">
              {t('Base APR (yield only)')}
            </Text>
            <Text small>{apr.toFixed(roundingDecimals)}%</Text>
          </Flex>
        </Box>
      )} */}
      <ROIContainer>
        <Grid>
          <GridHeaderItem>
            <Text fontSize="20px" color="textSubtle" textTransform="uppercase" mb="12px">
              {t('Timeframe')}
            </Text>
          </GridHeaderItem>
          <GridHeaderItem>
            <Text
              fontSize="20px"
              color="textSubtle"
              textTransform="uppercase"
            >
              {t('ROI')}
            </Text>
          </GridHeaderItem>
          <GridHeaderItem>
            <Text fontSize="20px" color="textSubtle" textTransform="uppercase" mb="12px">
              {t('per $1,000')}
            </Text>
          </GridHeaderItem>
          {/* 1 day row */}
          <GridItem>
            <p>{t('%num%d', { num: 1 })}</p>
          </GridItem>
          <GridItem>
            <p>
              {getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
                roundingDecimals,
              )}
              %
            </p>
          </GridItem>
          <GridItem>
            <p>{tokenEarnedPerThousand1D}</p>
          </GridItem>
          {/* 7 day row */}
          <GridItem>
            <p>{t('%num%d', { num: 7 })}</p>
          </GridItem>
          <GridItem>
            <p>
              {getRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
                roundingDecimals,
              )}
              %
            </p>
          </GridItem>
          <GridItem>
            <p>{tokenEarnedPerThousand7D}</p>
          </GridItem>
          {/* 30 day row */}
          <GridItem>
            <p>{t('%num%d', { num: 30 })}</p>
          </GridItem>
          <GridItem>
            <p>
              {getRoi({
                amountEarned: tokenEarnedPerThousand30D,
                amountInvested: oneThousandDollarsWorthOfToken,
              }).toFixed(roundingDecimals)}
              %
            </p>
          </GridItem>
          <GridItem>
            <p>{tokenEarnedPerThousand30D}</p>
          </GridItem>
          {/* 365 day / APY row */}
          <GridItem style={{ maxWidth: '180px' }}>
            <p>{t('365d (APY)')}</p>
          </GridItem>
          <GridItem>
            <p>
              {getRoi({
                amountEarned: tokenEarnedPerThousand365D,
                amountInvested: oneThousandDollarsWorthOfToken,
              }).toFixed(roundingDecimals)}
              %
            </p>
          </GridItem>
          <GridItem>
            <p>{tokenEarnedPerThousand365D}</p>
          </GridItem>
        </Grid>
        <Flex justifyContent="center">
          <Box mb="28px" maxWidth='480px' p="4px">
            <p>Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.</p>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <LinkExternal href={linkHref} color='#524F9E'>{linkLabel}</LinkExternal>
        </Flex>
      </ROIContainer>
    </Modal>
  )
}

export default ApyCalculatorModal

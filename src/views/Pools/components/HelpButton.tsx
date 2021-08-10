import React from 'react'
import styled from 'styled-components'
import { Text, Button, HelpIcon } from 'uikit'
import { useTranslation } from 'contexts/Localization'

const ButtonText = styled(Text)`
  display: none;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
  }
`

const StyledLink = styled.a`
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;

  &:hover {
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1;
  }
`

const HelpButton = () => {
  const { t } = useTranslation()
  return (
    <StyledLink href="https://docs.pancakeswap.finance/syrup-pools/syrup-pool" target="_blank" rel="noreferrer">
      <Button px={['14px', null, null, null, '20px']} variant="subtle">
        <ButtonText color="backgroundAlt" bold fontSize="16px">
          {t('Help')}
        </ButtonText>
        <HelpIcon color="backgroundAlt" ml={[null, null, null, 0, '6px']} />
      </Button>
    </StyledLink>
  )
}

export default HelpButton

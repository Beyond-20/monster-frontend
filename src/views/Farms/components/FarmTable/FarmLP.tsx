import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import { Token } from 'config/constants/types'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const FarmLP: React.FunctionComponent<FarmProps> = ({ label }) => {
  return (
    <Container>
      <Text bold>{label}</Text>
    </Container>
  )
}

export default FarmLP

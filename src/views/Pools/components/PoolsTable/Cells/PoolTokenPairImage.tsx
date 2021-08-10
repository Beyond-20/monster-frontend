import React from 'react'
import styled from 'styled-components'
import { TokenPairImageProps as UIKitTokenPairImageProps } from 'uikit'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import { StyledPrimaryImage } from 'uikit/components/Image/styles'
import { ReactComponent as ArrowRight } from 'assets/images/ArrowRight.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  background: #ACB0D3;
  border-radius: 30px;
  padding: 0 8px;
  & > svg {
    margin: 0 12px;
  }
  & > div {
    position: relative;
    width: 100%;
    & > img {
      position: relative;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 20px;
  }
`

interface PoolTokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
  isAuto: boolean
}

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/tokens/${address}.svg`
}

export const PoolTokenPairImage: React.FC<PoolTokenPairImageProps> = ({ primaryToken, secondaryToken, isAuto, ...props }) => {
  return (
    <Wrapper>
      <StyledPrimaryImage variant={props.variant} src={getImageUrlFromToken(primaryToken)} width={props.width} height={props.height} />
      <ArrowRight />
      <StyledPrimaryImage variant={props.variant} src={isAuto ? '/images/tokens/autorenew.svg' : getImageUrlFromToken(secondaryToken)} width={props.width} height={props.height} />
    </Wrapper>
  )
}

import React from 'react'
import styled from 'styled-components'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import Text from '../Text/Text'
import { LinkProps } from './types'

const StyledLink = styled(Text)<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  color: ${(props) => props.color};
  &:hover {
    text-decoration: underline;
  }
  & svg {
    fill: ${(props) => props.color};
  }
`

const Link: React.FC<LinkProps> = ({ external, children, href, color }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  return (
    <StyledLink as="a" {...internalProps} href={href} color={color}>
      {children}
    </StyledLink>
  )
}

Link.defaultProps = {
  color: 'primary',
}

export default Link

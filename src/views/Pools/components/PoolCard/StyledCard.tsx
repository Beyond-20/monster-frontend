import styled, { css, keyframes } from 'styled-components'
import { CardBody, Card, Box } from 'uikit'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

interface PromotedStyleCardProps {
  isDesktop: boolean
}

// export const StyledCard = styled(Card)<{ isPromoted?: PromotedStyleCardProps; isFinished?: boolean }>`
//   display: flex;
//   flex-direction: column;
//   align-self: baseline;
//   position: relative;
//   color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
//   box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);

//   ${({ isPromoted, theme }) =>
//     isPromoted
//       ? css`
//           background: linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary});
//           padding: 1px 1px 3px 1px;
//           background-size: 400% 400%;
//         `
//       : `background: ${(props) => props.theme.card.background};`}

//   ${({ isPromoted }) =>
//     isPromoted &&
//     isPromoted.isDesktop &&
//     css`
//       animation: ${PromotedGradient} 3s ease infinite;
//     `}

//   ${({ theme }) => theme.mediaQueries.sm} {
//     margin: 0 12px 46px;
//   }
// `

export const StyledCard = styled(Card)<{ isPromoted?: PromotedStyleCardProps; isFinished?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #EAF2F7;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 8px;
`

export const StyledCardInner = styled(Box)`
  & > div {
    padding: 0;
  }
`

export const StyledCardBody = styled.div`
  display: flex;
  width: 100%;
  & div, & p {
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: #4E4E9D;
  }
  & button {
    font-family: FunHouse;
    background: #49468A;
    font-size: 14px;
    border: none;
    & svg {
      fill: white;
    }
  }
`

export const StyledCardContent = styled.div`
  margin-left: 12px;
  flex: 1;
`

export default StyledCard

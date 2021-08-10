import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 100%;
    margin-bottom: 16px;
  }

  & h1 {
    font-size: 48px;
    line-height: 55px;
    color: #524f9e;
    text-transform: uppercase;
  }

  & h2 {
    font-size: 18px;
    line-height: 21px;
    color: #524f9e;
    text-transform: uppercase;
    margin-top: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;

    & > div {
      &:first-child {
        width: 50%;
      }
      &:last-child {
        width: 40%;
      }
    }
  }
`

const PortfolioBanner = styled.div`
  height: 225px;
  background: #4e4e9d;
  border-radius: 10px;
`

const PortfolioHeader: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Your Monster Portfolio</h1>
        <h2>Keep track of your pools and farms</h2>
      </div>
      <PortfolioBanner />
    </Container>
  )
}

export default PortfolioHeader

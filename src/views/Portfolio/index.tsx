import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Card, LinkExternal } from 'uikit'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import { ReactComponent as ArrowDown } from 'assets/images/ArrowDown.svg'
import { PortfolioHeader } from './components'
import { CardButton } from '../Home/components'

const Container = styled.div`
  padding: 48px;
  & > div {
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      flex-direction: row;
    }
  }
`

const MainPart = styled.div`
  margin-top: 32px;
`

const StyledTitle = styled.h1<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  color: #4e4e9d;
  text-transform: uppercase;
`

const StyledCard = styled(Card)<{ bgColor?: string; bordered?: boolean }>`
  padding: 20px;
  box-shadow: ${(props) => (props.bordered ? '0 0 10px 10px rgba(78, 78, 157, 0.2)' : '0 2px 0 rgba(25, 19, 38, 0.1)')};
  border: ${(props) => (props.bordered ? '1px solid #38E3F9' : 'none')};
  background-color: ${(props) => props.bgColor || '#FFF'};
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  h4 {
    font-size: 14px;
    line-height: 40px;
    color: #524f9e;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 49%;
  }
`
const CardLogo = styled.div`
  width: 40px;
  height: 40px;
  background: #454282;
  border-radius: 8px;
  margin-right: 8px;
`

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
  & p {
    font-family: 'Red Hat Text', sans-serif;
    color: rgba(17, 5, 24, 0.6);
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    & b {
      font-family: 'Red Hat Text', sans-serif;
      color: #4e4e9d;
    }
    & span {
      font-family: 'Red Hat Text', sans-serif;
      font-weight: normal;
    }
  }
  & > p {
    width: 50%;
  }
  & > p:last-child {
    text-align: right;
  }
  & > div {
    width: 50%;
    text-align: right;
    & > div {
      width: 100%;
      border-top: 1px solid #706974;
      padding: 8px 0 4px;
      & p {
        margin-bottom: 4px;
      }
    }
  }
`

const DetailsButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 31px;
  text-transform: uppercase;
  color: #524f9e;
  cursor: pointer;
  & svg {
    margin-left: 4px;
    path {
      fill: #524f9e;
    }
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-size: 18px;
`

const Portfolio: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Container>
      <PortfolioHeader />
      <MainPart>
        {account ? (
          <Flex flexWrap="wrap" justifyContent="space-between">
            <StyledCard>
              <StyledTitle fontSize="26px">Monster Portfolio</StyledTitle>
              <CardRow style={{ marginTop: 20 }}>
                <p>TVL ALL Pools</p>
                <p>
                  <b>$67.91</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Monster Holdings</p>
                <p>
                  <b>0.00</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Monster Price</p>
                <p>
                  <b>$2.34</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Your Monster Earnings ($)</p>
                <div>
                  <div>
                    <p>
                      <b>Daily: 0.16</b>
                    </p>
                    <p>
                      <b>$0.38</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Weekly: 1.14</b>
                    </p>
                    <p>
                      <b>$2.66</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Monthly: 4.88</b>
                    </p>
                    <p>
                      <b>$11.40</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Yearly: 59.33</b>
                    </p>
                    <p>
                      <b>$138.73</b>
                    </p>
                  </div>
                </div>
              </CardRow>
              <CardRow>
                <p>Your APR (%)</p>
                <div>
                  <div>
                    <p>
                      <b>Daily 0.56%</b>
                    </p>
                    <p>
                      <b>Weekly 3.92%</b>
                    </p>
                    <p>
                      <b>Monthly 16.79%</b>
                    </p>
                    <p>
                      <b>Yearly 204.27%</b>
                    </p>
                  </div>
                </div>
              </CardRow>
            </StyledCard>
            <StyledCard bordered>
              <Flex alignItems="center">
                <CardLogo />
                <StyledTitle fontSize="26px">Monster</StyledTitle>
              </Flex>
              <CardRow style={{ marginTop: 20 }}>
                <p>Your TVL</p>
                <p>
                  <b>14.74</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Your APR</p>
                <p>
                  <b>118.07%</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Your Pending Rewards</p>
                <div>
                  <p>
                    <b>0.05</b>
                  </p>
                  <p>
                    <span>($0.11)</span>
                  </p>
                </div>
              </CardRow>
              <h4>Earnings</h4>
              <CardRow>
                <p>Daily</p>
                <p>
                  <b>$0.05</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Weekly</p>
                <p>
                  <b>$0.0333</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Monthly</p>
                <p>
                  <b>$1.43</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Yearly</p>
                <p>
                  <b>$17.41</b>
                </p>
              </CardRow>
              <Flex justifyContent="center" style={{ marginTop: 20 }}>
                <StyledLinkExternal color="#524F9E" href="https://www.google.com">
                  View on BSCScan
                </StyledLinkExternal>
              </Flex>
            </StyledCard>
            <StyledCard bordered>
              <Flex alignItems="center">
                <CardLogo />
                <StyledTitle fontSize="26px">Monster-LP</StyledTitle>
              </Flex>
              <CardRow style={{ marginTop: 20 }}>
                <p>Your TVL</p>
                <p>
                  <b>$53.17</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Your APR</p>
                <p>
                  <b>228.17%</b>
                </p>
              </CardRow>
              <CardRow>
                <p>Your Pending Rewards</p>
                <div>
                  <p>
                    <b>0.30</b>
                  </p>
                  <p>
                    <span>($0.71)</span>
                  </p>
                </div>
              </CardRow>
              <Flex justifyContent="center">
                <DetailsButton
                  onClick={() => {
                    setShowDetails(!showDetails)
                  }}
                >
                  Details <ArrowDown />
                </DetailsButton>
              </Flex>
              {showDetails && (
                <>
                  <StyledTitle fontSize="26px">Earnings</StyledTitle>
                  <CardRow style={{ marginTop: 16 }}>
                    <p>Daily</p>
                    <p>
                      <b>$0.05</b>
                    </p>
                  </CardRow>
                  <CardRow>
                    <p>Weekly</p>
                    <p>
                      <b>$0.0333</b>
                    </p>
                  </CardRow>
                  <CardRow>
                    <p>Monthly</p>
                    <p>
                      <b>$1.43</b>
                    </p>
                  </CardRow>
                  <CardRow>
                    <p>Yearly</p>
                    <p>
                      <b>$17.41</b>
                    </p>
                  </CardRow>
                  <Flex justifyContent="center" style={{ marginTop: 20 }}>
                    <StyledLinkExternal color="#524F9E" href="https://www.google.com">
                      View on BSCScan
                    </StyledLinkExternal>
                  </Flex>
                </>
              )}
            </StyledCard>
          </Flex>
        ) : (
          <CardButton bgColor="#4e4e9d">Unlock Wallet</CardButton>
        )}
      </MainPart>
    </Container>
  )
}

export default Portfolio

import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { ReactComponent as HomeIcon } from 'assets/images/HomeIcon.svg'
import { ReactComponent as PortfolioIcon } from 'assets/images/PortfolioIcon.svg'
import { ReactComponent as TradeIcon } from 'assets/images/TradeIcon.svg'
import { ReactComponent as FarmIcon } from 'assets/images/FarmsIcon.svg'
import { ReactComponent as PoolIcon } from 'assets/images/PoolsIcon.svg'
import { ReactComponent as ReferralIcon } from 'assets/images/ReferralIcon.svg'
import { ReactComponent as LotteryIcon } from 'assets/images/LotteryIcon.svg'
import { ReactComponent as CollectiblesIcon } from 'assets/images/CollectiblesIcon.svg'
import { ReactComponent as InfoIcon } from 'assets/images/InfoIcon.svg'
import { ReactComponent as IMOIcon } from 'assets/images/IMOIcon.svg'
import { ReactComponent as MoreIcon } from 'assets/images/MoreIcon.svg'
import Accordion from './Accordion'
import { MenuEntry, LinkLabel, LinkStatus } from './MenuEntry'
import MenuLink from './MenuLink'
import { PanelProps, PushedProps } from '../types'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  & > div {
    & > a > div:nth-child(2),
    & > div > div:nth-child(2),
    & > div > div div {
      color: #938e96;
    }
    ,
    & > div > svg path {
      fill: #938e96;
    }
    &.active {
      box-shadow: inset 4px 0px 0px #524f9e;
      & > a > div:first-child {
        & svg path {
          stroke: #524f9e;
        }
      }
      & > a > div:nth-child(2),
      & > div > div:nth-child(2) {
        color: #524f9e;
      }
      & > div > svg path {
        fill: #524f9e;
      }
    }
  }
`

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  & svg path {
    fill: rgba(0, 0, 0, 0);
    stroke: #938e96;
  }
`

const MoreIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: #938e96;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation()

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined

  const IconElements = {
    Home: <HomeIcon />,
    Trade: <TradeIcon />,
    Farm: <FarmIcon />,
    Portfolio: <PortfolioIcon />,
    Pool: <PoolIcon />,
    Referral: <ReferralIcon />,
    Lottery: <LotteryIcon />,
    Collectibles: <CollectiblesIcon />,
    Info: <InfoIcon />,
    IMO: <IMOIcon />,
    More: (
      <MoreIconWrapper>
        <MoreIcon />
      </MoreIconWrapper>
    ),
  }

  return (
    <Container>
      {links.map((entry) => {
        const Icon = IconElements[entry.icon]
        const calloutClass = (entry.calloutClass || '') + (entry.href === location.pathname ? 'active' : '')

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname)
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={Icon}
              label={entry.label}
              status={entry.status}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item) => item.href === location.pathname)}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>
                      <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                      {item.status && (
                        <LinkStatus color={item.status.color} fontSize="14px">
                          {item.status.text}
                        </LinkStatus>
                      )}
                    </MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          )
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick}>
              <IconWrapper>{Icon}</IconWrapper>
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              {entry.status && (
                <LinkStatus color={entry.status.color} fontSize="14px">
                  {entry.status.text}
                </LinkStatus>
              )}
            </MenuLink>
          </MenuEntry>
        )
      })}
    </Container>
  )
}

export default PanelBody

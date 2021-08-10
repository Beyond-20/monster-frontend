import { MenuEntry } from 'uikit/widgets/Menu/types'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'Home',
    href: '/',
  },
  {
    label: t('Portfolio'),
    icon: 'Portfolio',
    href: '/portfolio',
  },
  {
    label: t('Trade'),
    icon: 'Trade',
    href: '/trade',
  },
  {
    label: t('Farms'),
    icon: 'Farm',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'Pool',
    href: '/pools',
  },
  {
    label: t('Referrals'),
    icon: 'Referral',
    href: '/referrals',
  },
  {
    label: t('Lottery'),
    icon: 'Lottery',
    href: '/lottery',
  },
  {
    label: t('Collectibles'),
    icon: 'Collectibles',
    href: '/collectibles',
  },
  {
    label: t('Info'),
    icon: 'Info',
    href: 'https://pancakeswap.info',
  },
  {
    label: t('IMO'),
    icon: 'IMO',
    href: '/imo',
  },
  {
    label: t('More'),
    icon: 'More',
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.pancakeswap.finance/contact-us',
      },
      {
        label: t('Voting'),
        href: '/voting',
      },
      {
        label: t('Github'),
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Docs'),
        href: 'https://docs.pancakeswap.finance',
      },
      {
        label: t('Blog'),
        href: 'https://pancakeswap.medium.com',
      },
      {
        label: t('Merch'),
        href: 'https://pancakeswap.creator-spring.com/',
      },
    ],
  },
]

export default config

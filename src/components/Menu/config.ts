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
    href: '/info',
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
        href: 'https://monsterswap.gitbook.io/monsterswap-1/contact/customer-support',
      },
      {
        label: t('Github'),
        href: 'https://github.com/monsterswap-finance',
      },
      {
        label: t('Docs'),
        href: 'https://monsterswap.gitbook.io/monsterswap-1/',
      },
      {
        label: t('Blog'),
        href: 'https://monsterswap.medium.com/',
      },
    ],
  },
]

export default config

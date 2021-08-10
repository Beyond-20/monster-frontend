import { AnchorHTMLAttributes } from 'react'
import { TextProps } from '../Text'

export interface LinkProps extends TextProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  children?: any
  href?: string
  color?: string
}

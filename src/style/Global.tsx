import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'uikit/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Funhouse';
    src: url(./font/Funhouse.ttf);
  }
  * {
    font-family: 'Funhouse';
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle

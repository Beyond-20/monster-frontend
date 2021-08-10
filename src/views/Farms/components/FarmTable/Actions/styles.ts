import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 0 16px;
  border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  & p, & h1, & h2 {
    font-family: 'Red Hat Text', sans-serif;
    color: #4E4E9D;
    letter-spacing: 0.01em;
  }

  & p {
    font-size: 14px;
    line-height: 19px;
  }

  & h1 {
    font-size: 24px;
    line-height: 32px;
  }

  & h2 {
    font-size: 18px;
    line-height: 32px;
  }

  & button {
    background: #49468a;
    border-radius: 16px;
    padding: 0;
    height: 40px;
    border: none;
    color: white;
    & svg {
      fill: white;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  }
`

export const StakedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const ActionTitles = styled.div`
  display: flex;
  & > div {
    font-size: 14px;
    font-family: 'Red Hat Text', sans-serif;
    line-height: 19px;
    font-weight: 500;
  }
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

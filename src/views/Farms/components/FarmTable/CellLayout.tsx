import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`

const ContentContainer = styled.div<{ label: string }>`
  min-height: 24px;
  display: flex;
  align-items: center;
  & div, & span {
    font-family: ${({ label }) => (label === 'Liquidity' || label === 'Earned') && "'Red Hat Text', sans-serif"};
    font-size: ${({ label }) => label === 'Earned' ? '24px' : '18px'};
    font-weight: ${({ label }) => (label === 'Liquidity' || label === 'Earned') && 'bold'};
    letter-spacing: ${({ label }) => (label === 'Liquidity' || label === 'Earned') ? '0.01em' : '0.04em'};
    color: #4E4E9D;
  }
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      {/* {label && <Label>{label}</Label>} */}
      <ContentContainer label={label}>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout

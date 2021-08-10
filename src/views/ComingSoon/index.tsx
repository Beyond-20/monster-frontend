import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 40px;
`

const ComingSoonContent = styled.div`
  padding: 80px;
  border-radius: 10px;
  background: #eaf2f7;
  text-align: center;
  & h1 {
    font-size: 48px;
    line-height: 55px;
    color: #524f9e;
    margin-bottom: 12px;
  }
  & p {
    color: #524f9e;
    font-family: 'Red Hat Text', sans-serif;
    font-size: 18px;
    line-height: 24px;
  }
`

interface ComingSoonProps {
  feature: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({ feature }) => {
  return (
    <Container>
      <ComingSoonContent>
        <h1>Coming Soon</h1>
        <p>{feature} features will be available soon</p>
      </ComingSoonContent>
    </Container>
  )
}

export default ComingSoon

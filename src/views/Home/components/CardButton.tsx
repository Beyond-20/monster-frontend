import React from 'react'
import styled from 'styled-components'

interface CardButtonProps {
  children: any
  onClick?: () => void
  bgColor: string
}

const ButtonWrapper = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  position: relative;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  cursor: pointer;
`

const ButtonTopRight = styled.div`
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-top-right-radius: 6px;
  width: 13px;
  height: 13px;
  position: absolute;
  right: 6px;
  top: 6px;
`

const ButtonBottomLeft = styled.div`
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom-left-radius: 6px;
  width: 13px;
  height: 13px;
  position: absolute;
  bottom: 6px;
  left: 6px;
`

const CardButton: React.FC<CardButtonProps> = ({ children, onClick, bgColor }) => {
  return (
    <ButtonWrapper bgColor={bgColor} onClick={onClick}>
      <ButtonBottomLeft />
      <ButtonTopRight />
      {children}
    </ButtonWrapper>
  )
}

export default CardButton

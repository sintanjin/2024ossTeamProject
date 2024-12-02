import React from 'react'
import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <p>제작자: 김태연, 이은혜</p>
    </Container>
  )
}

const Container = styled.div`

  background: #D9D9D9;
  height: 30px;
  width:100%;
  bottom:-250px;
  position: absolute;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  p{
    float: right;
    font-size: 10px;
    margin: 8px;
  }
`


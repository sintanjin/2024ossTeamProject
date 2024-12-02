import React from 'react'
import styled from 'styled-components';
export default function Header({ title }) {
    return (
        <Container>
            <h1>{title}</h1>
        </Container>
    )
}

const Container = styled.div`
    height: 160px;
    background: rgba(65, 171, 102, 0.65);
    position: relative;

    h1{
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -120px;
        font-size: 48px;
        font-weight: 700;
    }
`

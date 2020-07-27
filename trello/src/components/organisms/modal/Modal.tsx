import React from "react";
import styled, { css } from "styled-components";
import { CardHeader, CardTextBody, CardFooter } from "../../molecules";

const ModalStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 580px;
    max-height: 350px;
    text-align: center;
`;

function Modal() {
    return (
        <ModalStyle>
            <CardHeader>제목</CardHeader>
            <CardTextBody />
            <CardFooter />
        </ModalStyle>
    );
}

export default Modal;

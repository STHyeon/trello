import React from "react";
import styled from "styled-components";
import { CardHeader, CardTextBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface ModalProps extends CommonProps {
    modalTitle?: string;
}

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1020;
    min-width: 580px;
    border: 1px solid blanchedalmond;
    text-align: center;
    background: #ffffff;
    transform: translate(-50%, -50%);
`;

const StyledCurtain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1010;
    background: rgba(0, 0, 0, 0.5);
`;

function Modal({ children, ...props }: ModalProps) {
    const { modalTitle } = props;

    return (
        <>
            <StyledModal>
                <CardHeader border bdColor="#1980ff">
                    {modalTitle}
                </CardHeader>
                <CardTextBody>{children}</CardTextBody>
                <CardFooter>취소</CardFooter>
            </StyledModal>
            <StyledCurtain />
        </>
    );
}

export default Modal;

import React from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface ButtonProps extends CommonProps {
    icon?: boolean;
    modern?: boolean;
    showTxt?: boolean;
    columnDataID?: string;

    btnEvent?(): void;
    getOneData?(id?: string): void;
}

const StyledButton = styled.button<ButtonProps>`
    border: 0;

    & + button {
        margin: 0 0 0 5px;
    }

    ${(props) =>
        props.modern &&
        css`
            border: 1px solid #737373;
            color: #252525;
            transition: background 0.5s;
            color: #000000;

            &:hover {
                color: #ffffff !important;
                background: #646464;
            }
        `}

    ${(props) =>
        props.showTxt &&
        css`
            color: #000000 !important;
        `}
`;

function Button({ children, ...props }: ButtonProps) {
    const { btnEvent, getOneData, columnDataID } = props;

    return (
        <StyledButton
            {...props}
            onClick={() => {
                {
                    btnEvent && btnEvent();
                }
                {
                    getOneData && getOneData(columnDataID);
                }
            }}
        >
            {children}
        </StyledButton>
    );
}

export default Button;

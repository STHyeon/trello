import React from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface ButtonProps extends CommonProps {
    icon?: boolean;
    modern?: boolean;
    handleSubmit?(): any;
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
            transition: background 1s;

            &:hover {
                color: #ffffff;
                background: #646464;
            }
        `}
`;

function Button({ children, ...props }: ButtonProps) {
    const { handleSubmit } = props;

    return (
        <StyledButton {...props} onClick={handleSubmit}>
            {children}
        </StyledButton>
    );
}

export default Button;

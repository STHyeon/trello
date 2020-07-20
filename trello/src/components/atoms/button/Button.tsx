import React from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface ButtonProps extends CommonProps {
    icon?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
    border: 0;

    & + button {
        margin: 0 0 0 5px;
    }

    ${(props) =>
        props.icon &&
        css`
            height: 34px;
            padding: 5px;
            line-height: 34px;
            border-radius: 3px;
            background: hsla(0, 0%, 100%, 0.3);

            span {
                display: flex;
                color: white;
            }
        `}
`;

function Button({ children, ...props }: ButtonProps) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;

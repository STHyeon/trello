import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Button } from "../../atoms";
import styled, { css } from "styled-components";

interface CardButtonBodyProps extends CommonProps {
    individ_card?: boolean;
}

const StyledCardButtonBody = styled.div<CardButtonBodyProps>`
    ${(props) =>
        props.individ_card &&
        css`
            display: flex;
            z-index: 2;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 5px;

            button {
                width: 100%;
                height: 100%;
            }
        `}
`;

function CardButtonBody({ children, ...props }: CardButtonBodyProps) {
    return (
        <StyledCardButtonBody {...props}>
            <Button>{children}</Button>
        </StyledCardButtonBody>
    );
}
export default CardButtonBody;

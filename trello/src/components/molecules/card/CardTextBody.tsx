import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Span } from "../../atoms";
import styled from "styled-components";

interface CardTextBodyProps extends CommonProps {}

const StyledCardTextBody = styled.div``;

function CardTextBody({ children, ...props }: CardTextBodyProps) {
    return (
        <StyledCardTextBody {...props}>
            <Span>{children}</Span>
        </StyledCardTextBody>
    );
}
export default CardTextBody;

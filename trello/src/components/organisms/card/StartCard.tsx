import React from "react";
import styled from "styled-components";
import { CardButtonBody } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface StartCardProps extends CommonProps {
    key?: number;
}

const StyledStartCard = styled.div<StartCardProps>`
    width: 100%;
    height: 100%;
`;

function StartCard({ children, ...props }: StartCardProps) {
    const { key } = props;
    return (
        <StyledStartCard {...props} key={key}>
            <CardButtonBody individ_card>{children}</CardButtonBody>
        </StyledStartCard>
    );
}

export default StartCard;

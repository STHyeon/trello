import React from "react";
import styled, { css } from "styled-components";
import { CardHeader, CardButtonBody } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface StartCardProps extends CommonProps {
    MainCard?: boolean;
}

const StartCardStyle = styled.div<StartCardProps>`
    ${(props) =>
        props.MainCard &&
        css`
            width: 25%;
            height: 6.375rem;

            .individ_card button {
                display: flex;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                background: #f2f2f2;
                justify-content: center;
                align-items: center;
            }
        `}
`;

function StartCard({ children, ...props }: StartCardProps) {
    return (
        <StartCardStyle {...props} className="individ_card">
            <CardButtonBody>{children}</CardButtonBody>
        </StartCardStyle>
    );
}

export default StartCard;

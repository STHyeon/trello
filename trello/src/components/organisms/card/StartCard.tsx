import React from "react";
import styled, { css } from "styled-components";
import { CardButtonBody, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface StartCardProps extends CommonProps {
    MainCard?: boolean;
    key?: number;
    InputMode?: boolean;
}

const StartCardStyle = styled.div<StartCardProps>`
    ${(props) =>
        props.MainCard &&
        css`
            width: 24.145%;
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
        <>
            {props.InputMode ? (
                <StartCardStyle {...props} className="individ_card" key={props.key}>
                    <CardButtonBody>{children}</CardButtonBody>
                </StartCardStyle>
            ) : (
                <StartCardStyle {...props} className="individ_card" key={props.key}>
                    <CardInputBody>프로젝트명</CardInputBody>
                    <CardFooter />
                </StartCardStyle>
            )}
        </>
    );
}

export default StartCard;

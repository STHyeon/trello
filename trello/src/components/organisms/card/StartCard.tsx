import React from "react";
import styled, { css } from "styled-components";
import { CardButtonBody, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface StartCardProps extends CommonProps {
    MainCard?: boolean;
    key?: number;
    ModeBoard?: boolean;
    Click?(): void;
    Change?(value: string): void;
    handleSubmit?(): any;
}

const StartCardStyle = styled.div<StartCardProps>`
    ${(props) =>
        props.MainCard &&
        css`
            position: relative;
            width: 24%;
            height: 6.375rem;
            margin: 0 5px 10px;
            background: #f2f2f2;
        `}

    ${(props) =>
        props.ModeBoard &&
        css`
            background: #ffffff;
        `}
`;

function StartCard({ children, ...props }: StartCardProps) {
    const { key, Click, Change, handleSubmit } = props;
    return (
        <>
            {props.ModeBoard ? (
                <StartCardStyle {...props} key={key}>
                    <CardInputBody Change={Change}>프로젝트명</CardInputBody>
                    <CardFooter handleSubmit={handleSubmit} />
                </StartCardStyle>
            ) : (
                <StartCardStyle {...props} key={key} onClick={Click}>
                    <CardButtonBody individ_card>{children}</CardButtonBody>
                </StartCardStyle>
            )}
        </>
    );
}

export default StartCard;

import React from "react";
import styled, { css } from "styled-components";
import { CardButtonBody, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface InputCardProps extends CommonProps {
    key?: number;
    ModeBoard?: boolean;
    ChangeMode?(): void;
    getValue?(value: string, id?: string): void;
    handleSubmit?(): void;
}

const StyledInputCard = styled.div<InputCardProps>`
    width: 100%;
    height: 100%;

    ${(props) =>
        props.ModeBoard &&
        css`
            background: #ffffff;
        `}
`;

function InputCard({ children, ...props }: InputCardProps) {
    const { ChangeMode, getValue, handleSubmit, ModeBoard } = props;
    return (
        <>
            {ModeBoard ? (
                <StyledInputCard {...props}>
                    <CardInputBody getValue={getValue}>프로젝트명</CardInputBody>
                    <CardFooter handleSubmit={handleSubmit} ChangeMode={ChangeMode} />
                </StyledInputCard>
            ) : (
                <StyledInputCard {...props} onClick={ChangeMode}>
                    <CardButtonBody individ_card>{children}</CardButtonBody>
                </StyledInputCard>
            )}
        </>
    );
}

export default InputCard;

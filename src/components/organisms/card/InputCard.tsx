import React from "react";
import styled, { css } from "styled-components";
import { CardButtonBody, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface InputCardProps extends CommonProps {
    type: string;
    modeBoard?: boolean;
    startCard?: boolean;
    key?: number;

    getValue?(value: string, id?: string): void;
    changeMode?(): void;
    createBoard?(): void;
}

const StyledInputCard = styled.div<InputCardProps>`
    ${(props) =>
        props.modeBoard &&
        css`
            padding: 8px;
            background: #ffffff;
        `}

    ${(props) =>
        props.startCard &&
        css`
            width: 100%;
            height: 100%;
        `}
`;

function InputCard({ children, ...props }: InputCardProps) {
    const { changeMode, getValue, createBoard, modeBoard, type } = props;

    return (
        <>
            {modeBoard ? (
                <StyledInputCard {...props}>
                    <CardInputBody type={type} getValue={getValue}>
                        프로젝트명
                    </CardInputBody>
                    <CardFooter create createData={createBoard} changeMode={changeMode} />
                </StyledInputCard>
            ) : (
                <StyledInputCard {...props} onClick={changeMode}>
                    <CardButtonBody individCard>{children}</CardButtonBody>
                </StyledInputCard>
            )}
        </>
    );
}

export default InputCard;

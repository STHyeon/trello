import React from "react";
import styled, { css } from "styled-components";
import { CardTextBody } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface TextCardProps extends CommonProps {
    boardCard?: boolean;
    startCard?: boolean;

    dragData?: any; // any말고는...
}

const StyledTextCard = styled.div<TextCardProps>`
    ${(props) =>
        props.boardCard &&
        css`
            width: 100%;
            margin: 0 0 10px;
            padding: 3px 10px;
            border-radius: 5px;
            background: #ffffff;
            box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
        `}

    ${(props) =>
        props.startCard &&
        css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        `}
`;

function TextCard({ children, ...props }: TextCardProps) {
    const { dragData } = props;

    return (
        <>
            {dragData !== undefined ? (
                <StyledTextCard ref={dragData.innerRef} {...props.dragData.draggableProps} {...props.dragData.dragHandleProps} {...props}>
                    <CardTextBody>{children}</CardTextBody>
                </StyledTextCard>
            ) : (
                <StyledTextCard {...props}>
                    <CardTextBody>{children}</CardTextBody>
                </StyledTextCard>
            )}
        </>
    );
}

export default TextCard;

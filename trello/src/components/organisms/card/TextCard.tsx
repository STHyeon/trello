import React from "react";
import styled, { css } from "styled-components";
import { CardHeader, CardTextBody } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface TextCardProps extends CommonProps {
    BoardCard?: any;
    dragData?: any;
}

const TextCardStyle = styled.div<TextCardProps>`
    ${(props) =>
        props.BoardCard &&
        css`
            width: 100%;
            margin: 0 0 10px;
            padding: 3px 10px;
            border-radius: 5px;
            background: #ffffff;
            box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
        `}
`;

function TextCard({ children, ...props }: TextCardProps) {
    const { dragData } = props;
    return (
        <>
            {dragData ? (
                <TextCardStyle className="individ_card" ref={props.dragData.innerRef} {...props.dragData.draggableProps} {...props.dragData.dragHandleProps} {...props}>
                    <CardTextBody>{children}</CardTextBody>
                </TextCardStyle>
            ) : (
                <TextCardStyle className="individ_card" {...props}>
                    <CardTextBody>{children}</CardTextBody>
                </TextCardStyle>
            )}
        </>
    );
}

export default TextCard;

import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Textarea } from "../../atoms";
import styled from "styled-components";

interface CardTextareaBodyProps extends CommonProps {
    defaultValue?: string;

    getValue?(value: string, id?: string): void;
}

const StyledCardTextareaBody = styled.div`
    label {
        display: block;
        width: 100%;
        margin: 0 0 15px;
        padding: 0 0 5px;
        border-bottom: 1px solid #e3e3e3;
    }

    textarea {
        padding: 5px 8px;
    }
`;

function CardTextareaBody({ children, ...props }: CardTextareaBodyProps) {
    const { getValue, defaultValue } = props;

    return (
        <StyledCardTextareaBody>
            {/* label 유무 */}
            {children ? (
                <>
                    <label htmlFor="StartCard">{children}</label>
                    <Textarea id="StartCard" hei="33px" getValue={getValue} defaultValue={defaultValue} />
                </>
            ) : (
                <Textarea getValue={getValue} defaultValue={defaultValue} />
            )}
        </StyledCardTextareaBody>
    );
}
export default CardTextareaBody;

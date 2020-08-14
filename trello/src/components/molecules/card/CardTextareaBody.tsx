import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Textarea } from "../../atoms";
import styled from "styled-components";

interface CardTextareaBodyProps extends CommonProps {
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
`;

function CardTextareaBody({ children, ...props }: CardTextareaBodyProps) {
    const { getValue } = props;

    return (
        <StyledCardTextareaBody>
            {/* label 유무 */}
            {children ? (
                <>
                    <label htmlFor="StartCard">{children}</label>
                    <Textarea id="StartCard" hei="33px" getValue={getValue} />
                </>
            ) : (
                <Textarea getValue={getValue} />
            )}
        </StyledCardTextareaBody>
    );
}
export default CardTextareaBody;

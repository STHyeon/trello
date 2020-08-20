import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Input } from "../../atoms";
import styled, { css } from "styled-components";

interface CardInputBodyProps extends CommonProps {
    type: string;
    placeholder?: string;
    authCard?: boolean;

    getValue?(value: string, id?: string): void;
}

const StyledCardInputBody = styled.div<CardInputBodyProps>`
    ${(props) =>
        props.authCard &&
        css`
            & + & {
                margin: 17px 0 0;
            }
        `}

    label {
        display: block;
        width: 100%;
        margin: 0 0 15px;
        padding: 0 0 5px;
        border-bottom: 1px solid #e3e3e3;
    }
`;

function CardInputBody({ children, ...props }: CardInputBodyProps) {
    const { placeholder, type, getValue } = props;

    return (
        <StyledCardInputBody {...props}>
            {/* label 유무 */}
            {children ? (
                <>
                    <label htmlFor="StartCard">{children}</label>
                    <Input id="StartCard" hei="33px" type={type} getValue={getValue} placeholder={placeholder} />
                </>
            ) : (
                <Input type={type} getValue={getValue} placeholder={placeholder} />
            )}
        </StyledCardInputBody>
    );
}
export default CardInputBody;
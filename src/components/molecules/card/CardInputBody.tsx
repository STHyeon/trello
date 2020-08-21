import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Input } from "../../atoms";
import styled, { css } from "styled-components";

interface CardInputBodyProps extends CommonProps {
    type: string;
    value?: string;
    placeholder?: string;
    defaultValue?: string | undefined;
    authCard?: boolean;
    modifyList?: boolean;

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

    ${(props) =>
        props.modifyList &&
        css`
            width: 150px;
            text-align: left;

            input {
                width: 100%;
                height: 30px;
                color: #ffffff;
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
    const { placeholder, type, value, defaultValue, getValue } = props;

    return (
        <StyledCardInputBody {...props}>
            {/* label 유무 */}
            {children ? (
                <>
                    <label htmlFor="StartCard">{children}</label>
                    <Input id="StartCard" hei="33px" type={type} value={value} defaultValue={defaultValue} getValue={getValue} placeholder={placeholder} />
                </>
            ) : (
                <Input type={type} value={value} defaultValue={defaultValue} getValue={getValue} placeholder={placeholder} />
            )}
        </StyledCardInputBody>
    );
}
export default CardInputBody;

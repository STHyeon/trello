import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Input } from "../../atoms";
import styled from "styled-components";

interface CardInputBodyProps extends CommonProps {}

const CardInputBodyStyle = styled.div`
    label {
        display: block;
        width: 100%;
        margin: 0 0 5px;
        padding: 0 0 5px;
        border-bottom: 1px solid #e3e3e3;
    }
`;

function CardInputBody({ children, ...props }: CardInputBodyProps) {
    return (
        <CardInputBodyStyle>
            {children ? (
                <>
                    <label htmlFor="StartCard">{children}</label>
                    <Input id="StartCard" />
                </>
            ) : (
                <Input id="StartCard" />
            )}
        </CardInputBodyStyle>
    );
}
export default CardInputBody;

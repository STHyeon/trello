import React from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../../assets/utils/CommonType";

const CardBoxStyle = styled.div`
    display: flex;

    .individ_card + .individ_card {
        margin: 0 0 0 10px;
    }
`;

function CardBox({ children, ...props }: CommonProps) {
    return (
        <CardBoxStyle {...props}>
            {/* <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div> */}
            {children}
        </CardBoxStyle>
    );
}

export default CardBox;

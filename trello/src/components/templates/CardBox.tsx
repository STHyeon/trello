import React from "react";
import styled from "styled-components";
import { CommonProps } from "../../assets/utils/CommonType";

const CardBoxStyle = styled.div`
    display: flex;
    flex-wrap: wrap;

    .individ_card {
        margin: 0 10px 10px 0;

        &:nth-child(4n) {
            margin: 0 0 10px 0;
        }
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

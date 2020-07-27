import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

// interface CardFooterProps {
// children: React.ReactNode;
// props: any;
// }

const CardFooterStyle = styled.div``;

function CardFooter({ children, ...props }: CommonProps) {
    return (
        <CardFooterStyle>
            <Button green>생성</Button>
            <Button red>취소</Button>
        </CardFooterStyle>
    );
}
export default CardFooter;

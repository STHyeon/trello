import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    handleSubmit?(): any;
}

const CardFooterStyle = styled.div`
    margin: 10px 0 0;
    text-align: right;
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { handleSubmit } = props;
    return (
        <CardFooterStyle>
            <Button modern handleSubmit={handleSubmit}>
                생성
            </Button>
            <Button modern>취소</Button>
        </CardFooterStyle>
    );
}
export default CardFooter;

import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    handleSubmit?(): void;
    ChangeMode?(): void | undefined;
}

const StyledCardFooter = styled.div`
    margin: 10px 0 0;
    text-align: right;
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { handleSubmit, ChangeMode } = props;

    return (
        <StyledCardFooter>
            <Button modern btnEvent={handleSubmit}>
                생성
            </Button>
            <Button modern btnEvent={ChangeMode}>
                취소
            </Button>
        </StyledCardFooter>
    );
}
export default CardFooter;

import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    handleSubmit?(): void;
    ChangeMode?(): void | undefined;
    ChangeComment?: any;
    columnID?: string;
    create?: boolean;
}

const StyledCardFooter = styled.div`
    margin: 10px 0 0;
    text-align: right;
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { handleSubmit, ChangeMode, ChangeComment, columnID, create } = props;

    return (
        <>
            <StyledCardFooter>
                {create ? (
                    <>
                        <Button modern btnEvent={handleSubmit}>
                            생성
                        </Button>
                        <Button modern btnEvent={ChangeMode} ChangeComment={ChangeComment} columnID={columnID}>
                            취소
                        </Button>
                    </>
                ) : (
                    <Button modern btnEvent={handleSubmit}>
                        {children}
                    </Button>
                )}
            </StyledCardFooter>
        </>
    );
}
export default CardFooter;

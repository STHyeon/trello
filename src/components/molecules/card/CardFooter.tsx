import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    create?: boolean;
    columnDataID?: string;

    changeMode?(): void;
    createData?(): void;
    getOneChangeMode?(id?: string): void;
    getOneData2?(id?: string): void;
}

const StyledCardFooter = styled.div`
    margin: 10px 0 0;
    text-align: right;
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { createData, changeMode, getOneChangeMode, getOneData2, columnDataID, create } = props;

    return (
        <>
            <StyledCardFooter>
                {create ? (
                    <>
                        <Button modern showTxt btnEvent={createData}>
                            생성
                        </Button>
                        <Button modern showTxt btnEvent={changeMode} columnDataID={columnDataID} getOneData={getOneChangeMode} getOneData2={getOneData2}>
                            취소
                        </Button>
                    </>
                ) : (
                    <Button modern>{children}</Button>
                )}
            </StyledCardFooter>
        </>
    );
}
export default CardFooter;

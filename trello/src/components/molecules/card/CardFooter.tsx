import React from "react";
import { Button } from "../../atoms";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

// interface CardFooterProps {
// children: React.ReactNode;
// props: any;
// }

function CardFooter({ children, ...props }: CommonProps) {
    return (
        <div>
            <Button>생성</Button>
        </div>
    );
}
export default CardFooter;

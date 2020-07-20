import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import { Button } from "../../atoms";
import styled from "styled-components";
import { Add as AddIcon } from "@material-ui/icons";

// interface CardBodyProps {
//     children: React.ReactNode;
//     props: any;
// }

const CardButtonBodyStyle = styled.div`
    height: 100%;
    border-radius: 5px;

    button {
        width: 100%;
        height: 100%;
        background: #f2f2f2;

        svg {
            vertical-align: middle;
        }
    }
`;

function CardButtonBody({ children, ...props }: CommonProps) {
    return (
        <CardButtonBodyStyle>
            <Button>{children}</Button>
        </CardButtonBodyStyle>
    );
}
export default CardButtonBody;

import React from "react";
import { Title } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CommonTitleProps extends CommonProps {
    start?: any;
}

const CommonTitleStyle = styled.div<CommonTitleProps>`
    ${(props) =>
        props.start &&
        css`
            margin: 0 0 10px;
            padding: 0 0 5px;
            border-bottom: 1px solid #677b9b;

            h2 {
                font-weight: bold;
                font-size: 20px;
            }
        `}
`;

function CommonTitle({ children, ...props }: CommonTitleProps) {
    return (
        <CommonTitleStyle {...props}>
            <Title>{children}</Title>
        </CommonTitleStyle>
    );
}

export default CommonTitle;

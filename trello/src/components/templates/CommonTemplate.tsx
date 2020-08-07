import React from "react";
import NavBar from "../organisms/nav/NavBar";
import styled from "styled-components";
import { CommonProps } from "../../assets/utils/CommonType";
import { breakpoints } from "../../assets/utils/BreakPoints";

const StyledComplate = styled.div`
    padding: 78px 0 0;

    @media ${breakpoints.laptop} {
        padding: 60px 16px 0;
    }
`;

function CommonTemplate({ children }: CommonProps) {
    return (
        <div className="wrap">
            <NavBar />
            <StyledComplate>
                <div className="inner">{children}</div>
            </StyledComplate>
        </div>
    );
}

export default CommonTemplate;

import React from "react";
import styled from "styled-components";

import { NavLeft, NavRight, NavCenter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";

interface NavBarProps extends CommonProps {
    cookies?: any;

    logoutSubmit?(): void;
}

const StyledNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 4px;
    background: #026aa7;

    a + a {
        margin: 0 0 0 5px;
    }

    button {
        height: 34px;
        padding: 5px 6px;
        border-radius: 3px;
        line-height: 34px;
        background: hsla(0, 0%, 100%, 0.3);

        span {
            color: #ffffff;
        }
    }
`;

function NavBar({ ...props }: NavBarProps) {
    const { cookies, logoutSubmit } = props;
    return (
        <StyledNavBar>
            <NavLeft />
            <NavCenter />
            <NavRight cookies={cookies} logoutSubmit={logoutSubmit} />
        </StyledNavBar>
    );
}

export default NavBar;

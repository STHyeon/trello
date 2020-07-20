import React from "react";
import { NavLeft, NavRight, NavCenter } from "../../molecules";
import styled, { css } from "styled-components";

const StyleNavBar = styled.div`
    display: flex;
    width: 100%;
    padding: 4px;
    background: #026aa7;
    justify-content: space-between;
`;

function NavBar() {
    return (
        <StyleNavBar>
            <NavLeft></NavLeft>
            <NavCenter></NavCenter>
            <NavRight></NavRight>
        </StyleNavBar>
    );
}

export default NavBar;

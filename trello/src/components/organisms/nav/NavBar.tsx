import React from "react";
import { NavLeft, NavRight, NavCenter } from "../../molecules";
import styled from "styled-components";

const StyleNavBar = styled.div`
    display: flex;
    width: 100%;
    padding: 4px;
    background: #026aa7;
    justify-content: space-between;

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

function NavBar() {
    return (
        <StyleNavBar>
            <NavLeft />
            <NavCenter />
            <NavRight />
        </StyleNavBar>
    );
}

export default NavBar;

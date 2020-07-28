import React from "react";
import NavBox from "../navBox/NavBox";
import { Menu as MenuIcon, Dashboard as DashboardIcon } from "@material-ui/icons";

function NavLeft() {
    return (
        <div>
            <NavBox link="/">
                <MenuIcon />
            </NavBox>
            <NavBox link="/board">
                <DashboardIcon />
            </NavBox>
        </div>
    );
}

export default NavLeft;

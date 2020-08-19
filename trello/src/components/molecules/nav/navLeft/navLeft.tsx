import React from "react";
import NavBox from "../navBox/NavBox";
import { Dashboard as DashboardIcon } from "@material-ui/icons";

function NavLeft() {
    return (
        <div>
            <NavBox link="/board">
                <DashboardIcon />
            </NavBox>
        </div>
    );
}

export default NavLeft;

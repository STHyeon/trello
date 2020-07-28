import React from "react";
import NavBox from "../navBox/NavBox";
import { Home as HomeIcon } from "@material-ui/icons";

function NavCenter() {
    return (
        <div>
            <NavBox link="/">
                <HomeIcon />
            </NavBox>
        </div>
    );
}

export default NavCenter;

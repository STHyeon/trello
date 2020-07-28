import React from "react";
import NavBox from "../navBox/NavBox";
import { Add as AddIcon, Info as InfoIcon, Notifications as NotificationsIcon } from "@material-ui/icons";

function NavRight() {
    return (
        <div>
            <NavBox link="/">
                <AddIcon />
            </NavBox>
            <NavBox link="/">
                <InfoIcon />
            </NavBox>
            <NavBox link="/">
                <NotificationsIcon />
            </NavBox>
        </div>
    );
}

export default NavRight;

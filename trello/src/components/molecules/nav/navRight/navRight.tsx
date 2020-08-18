import React from "react";
import { Add as AddIcon, Info as InfoIcon, Notifications as NotificationsIcon } from "@material-ui/icons";

import NavBox from "../navBox/NavBox";
import { CommonProps } from "../../../../assets/utils/CommonType";

interface NavRightProps extends CommonProps {
    cookies?: any;

    logoutSubmit?(): void;
}

function NavRight({ ...props }: NavRightProps) {
    const { cookies, logoutSubmit } = props;
    console.log(cookies);
    return (
        <div>
            {cookies.user ? (
                <NavBox link="/" logoutSubmit={logoutSubmit}>
                    <InfoIcon />
                </NavBox>
            ) : (
                <NavBox link="/auth">
                    <AddIcon />
                </NavBox>
            )}

            <NavBox link="/">
                <NotificationsIcon />
            </NavBox>
        </div>
    );
}

export default NavRight;

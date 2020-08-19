import React from "react";
import { VpnKey as VpnKeyIcon, MeetingRoom as MeetingRoomIcon, Notifications as NotificationsIcon } from "@material-ui/icons";

import NavBox from "../navBox/NavBox";
import { CommonProps } from "../../../../assets/utils/CommonType";

interface NavRightProps extends CommonProps {
    cookies?: any;

    logoutSubmit?(): void;
}

function NavRight({ ...props }: NavRightProps) {
    const { cookies, logoutSubmit } = props;

    return (
        <div>
            {cookies.user ? (
                <NavBox link="/" logoutSubmit={logoutSubmit}>
                    <MeetingRoomIcon />
                </NavBox>
            ) : (
                <NavBox link="/auth">
                    <VpnKeyIcon />
                </NavBox>
            )}

            <NavBox link="/">
                <NotificationsIcon />
            </NavBox>
        </div>
    );
}

export default NavRight;

import React from "react";
import { Span, Input, Button } from "../../../atoms";
import { Add as AddIcon, Info as InfoIcon, Notifications as NotificationsIcon } from "@material-ui/icons";

function NavRight() {
    return (
        <div>
            <Button icon>
                <Span>
                    <AddIcon />
                </Span>
            </Button>
            <Button icon>
                <Span>
                    <InfoIcon />
                </Span>
            </Button>
            <Button icon>
                <Span>
                    <NotificationsIcon />
                </Span>
            </Button>
        </div>
    );
}

export default NavRight;

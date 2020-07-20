import React from "react";
import { Span, Button } from "../../../atoms";
import { Dashboard as DashboardIcon } from "@material-ui/icons";

function NavCenter() {
    return (
        <div>
            <Button icon>
                <Span>
                    <DashboardIcon />
                </Span>
            </Button>
        </div>
    );
}

export default NavCenter;

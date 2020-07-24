import React from "react";
import { Span, Button } from "../../../atoms";
import { Dashboard as DashboardIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

function NavCenter() {
    return (
        <div>
            <Link to="/">
                <Button icon>
                    <Span>
                        <DashboardIcon />
                    </Span>
                </Button>
            </Link>
        </div>
    );
}

export default NavCenter;

import React from "react";
import { Span, Input, Button } from "../../../atoms";
import { Home as HomeIcon, Menu as MenuIcon, Dashboard as DashboardIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

function NavLeft() {
    return (
        <div>
            <Link to="/board">
                <Button icon>
                    <Span>
                        <HomeIcon />
                    </Span>
                </Button>
            </Link>
            <Link to="/board">
                <Button icon>
                    <Span>
                        <MenuIcon />
                    </Span>
                </Button>
            </Link>
            <Link to="/">
                <Button icon>
                    <Span>
                        <DashboardIcon />
                        {/* <Input></Input> */}
                    </Span>
                </Button>
            </Link>
        </div>
    );
}

export default NavLeft;

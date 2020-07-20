import React from "react";
import { Span, Input, Button } from "../../../atoms";
import { Home as HomeIcon, Menu as MenuIcon, Dashboard as DashboardIcon } from "@material-ui/icons";

function NavLeft() {
    return (
        <div>
            <Button icon>
                <Span>
                    <HomeIcon />
                </Span>
            </Button>
            <Button icon>
                <Span>
                    <MenuIcon />
                </Span>
            </Button>
            <Button icon>
                <Span>
                    <DashboardIcon />
                    {/* <Input></Input> */}
                </Span>
            </Button>
        </div>
    );
}

export default NavLeft;

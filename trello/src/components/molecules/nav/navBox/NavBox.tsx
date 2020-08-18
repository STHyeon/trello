import React from "react";
import { Span, Button } from "../../../atoms";
import { CommonProps } from "../../../../assets/utils/CommonType";
import { Link } from "react-router-dom";

interface NavBoxProps extends CommonProps {
    normal?: boolean;
    link: string;

    logoutSubmit?(): void;
}

function NavBox({ children, ...props }: NavBoxProps) {
    const { link, normal, logoutSubmit } = props;

    return (
        <Link to={link}>
            {normal ? (
                <Span>{children}</Span>
            ) : (
                <Button {...props} btnEvent={logoutSubmit}>
                    <Span>{children}</Span>
                </Button>
            )}
        </Link>
    );
}

export default NavBox;

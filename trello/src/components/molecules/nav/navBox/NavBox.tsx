import React from "react";
import { Span, Button } from "../../../atoms";
import { CommonProps } from "../../../../assets/utils/CommonType";
import { Link } from "react-router-dom";

interface NavBoxProps extends CommonProps {
    Change?(value: string): void;
    link: string;
}

function NavBox({ children, ...props }: NavBoxProps) {
    const { link } = props;
    return (
        <Link to={link}>
            <Button {...props}>
                <Span>{children}</Span>
            </Button>
        </Link>
    );
}

export default NavBox;

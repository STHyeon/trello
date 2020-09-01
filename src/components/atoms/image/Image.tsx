import React from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface ImageProps extends CommonProps {
    logo?: boolean;

    link: string;
    alt: string;
}

const StyledImage = styled.div<ImageProps>`
    ${(props) =>
        props.logo &&
        css`
            height: 31px;

            img {
                height: 100%;
            }
        `}
`;

function Image({ ...props }: ImageProps) {
    const { alt, link } = props;
    return (
        <StyledImage {...props}>
            <img src={link} alt={alt} />
        </StyledImage>
    );
}

export default Image;

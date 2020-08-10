import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { NavBar, Modal } from "../organisms";
import styled from "styled-components";
import { CommonProps } from "../../assets/utils/CommonType";
import { breakpoints } from "../../assets/utils/BreakPoints";

export const Context = createContext<any>({});

const StyledComplate = styled.div`
    padding: 78px 0 0;

    @media ${breakpoints.laptop} {
        padding: 60px 16px 0;
    }
`;

export function CommonTemplate({ children }: CommonProps) {
    const history = useHistory();
    const [modal, setModal] = useState({
        title: "",
        txt: "",
        isOpen: false,
    });
    return (
        <Context.Provider value={{ history, setModal }}>
            <div className="wrap">
                <NavBar />
                <StyledComplate>
                    <div className="inner">{children}</div>
                </StyledComplate>
                {modal.isOpen ? <Modal modalTitle={modal.title}>{modal.txt}</Modal> : null}
            </div>
        </Context.Provider>
    );
}

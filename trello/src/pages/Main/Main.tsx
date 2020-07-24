import React from "react";
import { StartCard, CommonTemplate, CardBox, CommonTitle } from "../../components";
import "../../assets/scss/index.scss";
// import Time from "./Time";

function Main() {
    return (
        <CommonTemplate>
            <CommonTitle start>프로젝트 목록</CommonTitle>
            <CardBox>
                <StartCard MainCard>프로젝트1</StartCard>
                <StartCard MainCard>Create New Board</StartCard>
            </CardBox>
        </CommonTemplate>
    );
}

export default Main;

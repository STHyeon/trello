import React from "react";
import NavBar from "./NavBar";

export default {
    title: "organisms|NavBar", // 스토리북에서 보여질 그룹과 경로를 명시
    component: NavBar, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_NavBar = () => {
    // knobs 만들기
    return <NavBar />;
};

import React from "react";
import Modal from "./Modal";

export default {
    title: "organisms|Modal", // 스토리북에서 보여질 그룹과 경로를 명시
    component: Modal, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_Modal = () => {
    // knobs 만들기
    return <Modal />;
};

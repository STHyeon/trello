import React from "react";
// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { DragDropContext } from "react-beautiful-dnd";
// import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

// import { DropZone } from "../../organisms";
// import { CommonTemplate } from "../../templates";
// import { GET_DETAIL_BOARD, CREATE_LIST, LIST_SUBSCRIPTION, CREATE_COMMENT, COMMENT_SUBSCRIPTION } from "../../../assets/utils/Queries";

// const StyledBoard = styled.div`
//     display: flex;

//     .BoardList {
//         width: 272px;
//         padding: 10px;
//         border-radius: 10px;
//         background: #ebecf0;

//         & + .BoardList {
//             margin: 0 0 0 10px;
//         }
//     }
// `;

// function Test1(props: any) {
//     const boardID = props.match.params.id;
//     const [modeList, setModeList] = useState(false);
//     // https://stackoverflow.com/questions/54853444/how-to-show-hide-an-item-of-array-map
//     // 리스트 마다 각각의 toggle 설정방법
//     const [modeComment, setModeComment] = useState({});
//     const [listData, setListData] = useState(); // 타입 정의 필요
//     const [listName, setListName] = useState("");
//     const [comments, setComments] = useState("");
//     const [listID, setListID] = useState("");

//     const { loading: getListLoading, error: getListError, data: getListData } = useQuery(GET_DETAIL_BOARD, { variables: { _id: boardID } });
//     const [createLists, { loading: createListLoading, error: createListError }] = useMutation(CREATE_LIST);
//     const [createComments, { loading: createCommentLoading, error: createCommentError }] = useMutation(CREATE_COMMENT);
//     const { error: getListLiveError, data: getListLiveData } = useSubscription(LIST_SUBSCRIPTION);
//     const { error: getCommentLiveError } = useSubscription(COMMENT_SUBSCRIPTION);

//     useEffect(() => {
//         if (getListLiveData) {
//             setListData(getListLiveData.newLists);
//         }
//     }, [getListLiveData]);

//     useEffect(() => {
//         if (getListData) {
//             getListData.getBoard.map((obj: any) => {
//                 setListData(obj);
//             });
//         }
//     }, [getListData]);

//     if (getListLoading) return <p>Get List Loading...</p>;
//     if (getListError) return <p>Get List Error</p>;

//     if (createListLoading) return <p>Create List Loading...</p>;
//     if (createListError) return <p>Create List Error</p>;

//     if (createCommentLoading) return <p>Create Comment Loading...</p>;
//     if (createCommentError) return <p>Create Comment Error</p>;

//     if (getListLiveError) return <p>Get List Live Error</p>;

//     if (getCommentLiveError) return <p>Get Comment Live Error</p>;

//     return <div>a</div>;
// }

function Test1() {
    return <div>a</div>;
}

export default Test1;

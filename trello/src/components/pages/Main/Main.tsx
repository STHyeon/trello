import React, { useState, useEffect } from "react";
import { StartCard, CommonTitle } from "../../organisms";
import { CommonTemplate, CardBox } from "../../templates";
import "../../../assets/scss/index.scss";
import { GET_BOARDS, BOARD_SUBSCRIPTION, CREATE_BOARD } from "../../../assets/utils/Queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Main() {
    let unsubscribe = null; //publish 했을때 변화
    const { loading: BoardLoading, error: BoardError, data, subscribeToMore } = useQuery(GET_BOARDS);
    const [ModeBoard, SetModeBoard] = useState(false);
    const [BoardName, SetBoardName] = useState("");
    const [createBoard, { loading: SubmitLoading, error: SubmitError }] = useMutation(CREATE_BOARD);

    const ChangeMode = (): void => {
        SetModeBoard(true);
    };

    const GetBoard = (value: string): void => {
        SetBoardName(value);
    };

    if (BoardLoading) return <p>Loading...</p>;
    if (BoardError) return <p>Error!</p>;

    if (SubmitLoading) return <p>Loading...</p>;
    if (SubmitError) return <p>Error!</p>;

    if (!unsubscribe) {
        subscribeToMore({
            document: BOARD_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev; // prev 이전 데이터

                const { newBoard } = subscriptionData.data; // 신규 데이터

                return {
                    ...prev,
                    allBoard: [...prev.allBoard, newBoard],
                };
            },
        });
    }

    const handleSubmit = (): void => {
        if (BoardName.length > 0) {
            createBoard({ variables: { title: BoardName } });
        }

        SetBoardName("");
    };

    const MainStyle = styled.div`
        position: relative;
        width: 24%;
        height: 6.375rem;
        margin: 0 5px 10px;
        line-height: 6.375rem;
        background: #f2f2f2;
    `;

    return (
        <CommonTemplate>
            <CommonTitle start="true">프로젝트 목록</CommonTitle>
            <CardBox>
                {data.allBoard.map((dataBoard: any, code: number) => (
                    <MainStyle key={code}>
                        <Link to={`/board/${dataBoard._id}`}>
                            <StartCard>{dataBoard.title}</StartCard>
                        </Link>
                    </MainStyle>
                ))}
                <MainStyle>
                    <StartCard ModeBoard={ModeBoard} Click={ChangeMode} Change={GetBoard} handleSubmit={handleSubmit}>
                        Create New Board
                    </StartCard>
                </MainStyle>
            </CardBox>
        </CommonTemplate>
    );
}

export default Main;

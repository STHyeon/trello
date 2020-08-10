import React, { useState, useEffect, useContext } from "react";
import { Context, CardBox, CommonTemplate } from "../../templates";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { StartCard, InputCard, CommonTitle } from "../../organisms";
import "../../../assets/scss/index.scss";

import { GET_BOARDS, CREATE_BOARD, BOARD_SUBSCRIPTION } from "../../../assets/utils/Queries";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

const StyledMain = styled.div`
    position: relative;
    width: 24%;
    height: 6.375rem;
    margin: 0 5px 10px;
    background: #f2f2f2;
`;

function Main() {
    const { loading: BoardLoading, error: BoardError, data: BoardData } = useQuery(GET_BOARDS);
    const [createBoard, { loading: SubmitLoading, error: SubmitError }] = useMutation(CREATE_BOARD);
    const { error: LiveError, data: LiveData } = useSubscription(BOARD_SUBSCRIPTION);

    const [ModeBoard, SetModeBoard] = useState(false);
    const [BoardName, SetBoardName] = useState("");
    const { setModal } = useContext(Context);

    useEffect(() => {
        if (LiveData) {
            console.log(LiveData);
            BoardData.allBoard.push(LiveData.newBoard);
        }
    }, [LiveData]);

    const ChangeMode = (): void => {
        SetModeBoard(!ModeBoard);
    };

    const GetBoard = (value: string): void => {
        SetBoardName(value);
    };

    const handleSubmit = (): void => {
        if (BoardName.length > 0) {
            createBoard({ variables: { title: BoardName } });
        }

        SetBoardName("");
        SetModeBoard(false);
    };

    if (BoardLoading) return <p>Loading...</p>;
    if (BoardError) return <p>Error!</p>;

    if (SubmitLoading) return <p>Loading...</p>;
    if (SubmitError) return <p>Error!</p>;

    // if (LiveLoading) return <p>Loading...</p>;
    if (LiveError) return <p>Error!</p>;

    return (
        <CommonTemplate>
            <CommonTitle start="true">프로젝트 목록</CommonTitle>
            <CardBox>
                {BoardData.allBoard.map((dataBoard: any, code: number) => (
                    <StyledMain key={code}>
                        <Link to={`/board/${dataBoard._id}`}>
                            <StartCard>{dataBoard.title}</StartCard>
                        </Link>
                    </StyledMain>
                ))}
                <StyledMain>
                    <InputCard ModeBoard={ModeBoard} getValue={GetBoard} handleSubmit={handleSubmit} ChangeMode={ChangeMode}>
                        Create New Board
                    </InputCard>
                </StyledMain>
            </CardBox>
        </CommonTemplate>
    );
}

export default Main;

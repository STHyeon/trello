import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useCookies } from "react-cookie";

import { TextCard, InputCard, CommonTitle } from "../../organisms";
import { CardBox } from "../../templates";
import { CommonTemplate, CommonLoading, CommonError } from "../../context";
import { CREATE_BOARD, BOARD_SUBSCRIPTION, DROP_BOARD, GET_USER_BOARD } from "../../../assets/utils/Queries";
import "../../../assets/scss/index.scss";

// https://stackoverflow.com/questions/41385059/possible-to-extend-types-in-typescript
// type in type 쓰는 법

type commentType = {
    _id: string;
    content: string;
};

type listType = {
    _id: string;
    listTitle: string;
    taskIds: Array<commentType>;
};

type boardType = {
    _id?: string;
    title?: string;
    list?: listType;
};

const StyledDeleteIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    svg {
        color: #ffffff;
        opacity: 0;
        visibility: hidden;
    }
`;

const StyledMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 300px;
    height: 142px;
    margin: 0 5px 10px;
    padding: 8px;
    background: linear-gradient(to left, #ffffff 50%, #525ac2 50%);
    background-size: 200% 0%;
    background-position: 100% 100%;
    transition: all ease 200ms;
    box-shadow: 1px 1px 2px 0px rgba(128, 128, 128, 1);

    a {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-size: 200% 200%;
        background-position: 0% 0%;

        button,
        span {
            color: #ffffff;
        }

        svg {
            opacity: 1;
            visibility: visible;
        }
    }
`;

function MainPage() {
    const [modeBoard, setModeBoard] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [delID, setDelID] = useState("");
    const [cookies] = useCookies(["user"]);
    const history = useHistory();

    const [getUserBoard, { loading: allListLoading, error: allListError, data: allListData }] = useLazyQuery(GET_USER_BOARD);
    const [createBoard, { loading: createListLoading, error: createListError }] = useMutation(CREATE_BOARD);
    const [dropBoard, { loading: dropBoardLoading, error: dropBoardError }] = useMutation(DROP_BOARD);
    const { error: allListLiveError, data: allListLiveData } = useSubscription(BOARD_SUBSCRIPTION);

    useEffect(() => {
        if (!cookies.user) {
            history.push("/auth");
        } else {
            getUserBoard({ variables: { _id: cookies.user.user._id } });
        }
    }, [cookies, history, getUserBoard]);

    useEffect(() => {
        if (allListLiveData) {
            if (delID) {
                const getDeleteID = allListData.getUserBoard
                    .map((e: boardType) => {
                        return e._id;
                    })
                    .indexOf(delID);
                if (getDeleteID > -1) {
                    allListData.getUserBoard.splice(getDeleteID, 1);
                }
                setDelID("");
            }
            if (allListLiveData.newBoard._id !== null) {
                allListData.getUserBoard.push(allListLiveData.newBoard);
            }
        }
    }, [allListLiveData, delID]);

    const getBoardName = (value: string): void => {
        setBoardName(value);
    };

    const newCreateBoard = (): void => {
        if (boardName.length > 0) {
            createBoard({ variables: { title: boardName, author: cookies.user.user._id } });
        }

        setBoardName("");
        setModeBoard(false);
    };

    const changeMode = (): void => {
        setModeBoard(!modeBoard);
    };

    const existedDropBoard = (id?: string): void => {
        dropBoard({ variables: { boardID: id } });
        id && setDelID(id);
    };

    if (allListLoading) return <CommonLoading>All List</CommonLoading>;
    if (allListError) return <CommonError>{allListError.message}</CommonError>;

    // if (createListLoading) return <CommonLoading>Create List</CommonLoading>;
    if (createListLoading) {
    }
    if (createListError) return <CommonError>{createListError.message}</CommonError>;

    // if (dropBoardLoading) return <CommonLoading>Drop Board</CommonLoading>;
    if (dropBoardLoading) {
    }
    if (dropBoardError) return <CommonError>{dropBoardError.message}</CommonError>;

    if (allListLiveError) return <CommonError>{allListLiveError.message}</CommonError>;

    return (
        <CommonTemplate>
            <CommonTitle startTitle>프로젝트 목록</CommonTitle>
            <CardBox>
                {allListData
                    ? allListData.getUserBoard.map((dataBoard: any, code: any) => (
                          <StyledMain key={code}>
                              <StyledDeleteIcon onClick={() => existedDropBoard(dataBoard._id)}>
                                  <DeleteIcon />
                              </StyledDeleteIcon>
                              <Link to={`/board/${dataBoard._id}`}>
                                  <TextCard startCard>{dataBoard.title}</TextCard>
                              </Link>
                          </StyledMain>
                      ))
                    : null}
                <StyledMain>
                    <InputCard type="text" startCard modeBoard={modeBoard} changeMode={changeMode} getValue={getBoardName} createBoard={newCreateBoard}>
                        Create New Board
                    </InputCard>
                </StyledMain>
            </CardBox>
        </CommonTemplate>
    );
}

export default MainPage;

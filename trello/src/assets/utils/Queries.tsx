import gql from "graphql-tag";

// 글쓰기 관련
export const GET_BOARDS = gql`
    query {
        allBoard {
            _id
            title
            author
            list {
                _id
                listTitle
                author
                taskIds {
                    _id
                    author
                    content
                }
            }
        }
    }
`;

export const GET_DETAIL_BOARD = gql`
    query GetBoard($_id: ID!) {
        getBoard(_id: $_id) {
            list {
                _id
                author
                listTitle
                taskIds {
                    _id
                    author
                    content
                }
            }
        }
    }
`;

export const GET_USER_BOARD = gql`
    query GetUserBoard($_id: ID!) {
        getUserBoard(_id: $_id) {
            _id
            title
            author
            list {
                _id
                listTitle
                author
                taskIds {
                    _id
                    author
                    content
                }
            }
        }
    }
`;

export const BOARD_SUBSCRIPTION = gql`
    subscription {
        newBoard {
            _id
            title
            author
            list {
                _id
                listTitle
                author
                taskIds {
                    _id
                    content
                    author
                }
            }
        }
    }
`;

export const LIST_SUBSCRIPTION = gql`
    subscription {
        newLists {
            list {
                _id
                listTitle
                author
                taskIds {
                    _id
                    content
                    author
                }
            }
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation CreateBoard($title: String!, $author: String) {
        createBoard(title: $title, author: $author) {
            _id
            title
            author
        }
    }
`;

export const CREATE_LIST = gql`
    mutation CreateLists($id: String, $listTitle: String!, $author: String) {
        createLists(id: $id, listTitle: $listTitle, author: $author) {
            _id
            listTitle
            author
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation CreateComment($boardID: String, $listID: String, $content: String!, $author: String) {
        createComments(boardID: $boardID, listID: $listID, content: $content, author: $author) {
            _id
            title
            author
        }
    }
`;

export const DROP_BOARD = gql`
    mutation DropBoard($boardID: String) {
        dropBoard(boardID: $boardID)
    }
`;

export const DROP_LIST = gql`
    mutation DropList($boardID: String, $listID: String) {
        dropList(boardID: $boardID, listID: $listID)
    }
`;

export const DROP_COMMENT = gql`
    mutation DropComment($boardID: String, $listID: String, $commentID: String) {
        dropComment(boardID: $boardID, listID: $listID, commentID: $commentID)
    }
`;

export const CHANGE_POSITION = gql`
    mutation ChangePosition($boardID: String, $ListAll: inputListAll) {
        changePosition(boardID: $boardID, ListAll: $ListAll)
    }
`;

// 회원 관련
export const CREATE_USER = gql`
    mutation SignUpUser($userID: String!, $userName: String, $userPW: String!) {
        signup(userID: $userID, userName: $userName, userPW: $userPW) {
            token
            user {
                _id
                userID
                userName
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($userID: String!, $userPW: String!) {
        login(userID: $userID, userPW: $userPW) {
            token
            user {
                _id
                userID
                userName
            }
        }
    }
`;

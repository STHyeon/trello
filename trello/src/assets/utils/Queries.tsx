import gql from "graphql-tag";

export const GET_BOARDS = gql`
    query {
        allBoard {
            _id
            title
            list {
                _id
                listTitle
                taskIds {
                    _id
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
                listTitle
                taskIds {
                    _id
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
            list {
                _id
                listTitle
                taskIds {
                    _id
                    content
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
                taskIds {
                    _id
                    content
                }
            }
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation CreateBoard($title: String!) {
        createBoard(title: $title) {
            _id
            title
        }
    }
`;

export const CREATE_LIST = gql`
    mutation CreateLists($id: String, $listTitle: String!) {
        createLists(id: $id, listTitle: $listTitle) {
            _id
            listTitle
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation CreateComment($boardID: String, $listID: String, $content: String!) {
        createComments(boardID: $boardID, listID: $listID, content: $content) {
            _id
            title
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

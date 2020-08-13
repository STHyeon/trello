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
    mutation CreateComment($id1: String, $id2: String, $content: String!) {
        createComments(id1: $id1, id2: $id2, content: $content) {
            _id
            title
        }
    }
`;

export const DROP_BOARD = gql`
    mutation DropBoard($id: String) {
        dropBoard(id: $id)
    }
`;

export const DROP_LIST = gql`
    mutation DropList($Boardid: String, $Listid: String) {
        dropList(Boardid: $Boardid, Listid: $Listid)
    }
`;

export const DROP_COMMENT = gql`
    mutation DropComment($Boardid: String, $Listid: String, $Commentid: String) {
        dropComment(Boardid: $Boardid, Listid: $Listid, Commentid: $Commentid)
    }
`;

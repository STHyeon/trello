const { gql } = require("apollo-server");

// 느낌표(!) = null값이 아닌 값을 반환할 것을 기대함
// null 발생 시 오류

export const typeDefs = gql`
    type Comments {
        _id: ID
        contents: String
    }

    type Board {
        _id: ID
        title: String
    }

    input BoardInput {
        title: String
    }

    input CommentsInput {
        _id: ID
        contents: String
    }

    type Query {
        allBoard: [Board]
    }

    type Mutation {
        createBoard(title: String): String
        createComments(id: String, contents: String): Comments
    }

    type Subscription {
        newBoard: Board
    }
`;

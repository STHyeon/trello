const { gql } = require("apollo-server");

// 느낌표(!) = null값이 아닌 값을 반환할 것을 기대함
// null 발생 시 오류

export const typeDefs = gql`
    type Comments {
        _id: ID
        contents: String
    }

    type Lists {
        _id: ID
        Today: String
    }

    type Board {
        _id: ID
        title: String
        list: [Lists]
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
        getBoard(_id: ID!): [Board]
    }

    type Mutation {
        createBoard(title: String): String
        createComments(id: String, contents: String): String
    }

    type Subscription {
        newBoard: Board
    }
`;

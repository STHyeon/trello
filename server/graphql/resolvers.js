import Board from "../models/board";

const BOARD_ADDED = "BOARD_ADDED";

export const resolvers = {
    Query: {
        allBoard: async () => {
            return await Board.find();
        },

        getBoard: async (_, { _id }) => {
            const result = await Board.find({ $and: [{ _id: _id }] });
            return result;
        },
    },

    Mutation: {
        createBoard: async (_, { title }, { pubsub }) => {
            const boardBox = {
                title,
            };

            await Board.create(boardBox, (err, blog) => {
                if (err) return err;
                pubsub.publish(BOARD_ADDED, { newBoard: boardBox });
            });

            return "SUCCESS";
        },

        createComments: async (_, { id, contents }) => {
            var InCon = { Today: contents };
            await Board.updateOne({ _id: id }, { $push: { list: InCon } }, function (err, post) {
                if (err) return console.log("에러");
            });

            return "SUCCESS";
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([BOARD_ADDED]),
        },
    },
};

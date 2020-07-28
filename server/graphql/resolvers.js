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
            console.log(contents);
            var z = { so: contents };
            var a = Board.updateOne({ _id: id }, { $push: { comments: z } }, function (err, post) {
                if (err) return console.log("에로");
            });

            return await a;
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([BOARD_ADDED]),
        },
    },
};

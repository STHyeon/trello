import Board from "../models/board";

const BOARD_ADDED = "BOARD_ADDED";
const LIST_ADDED = "LIST_ADDED";

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

            const result = await Board.create(boardBox);
            pubsub.publish(BOARD_ADDED, {
                newBoard: result,
            });

            return result;
        },

        createLists: async (_, { id, listTitle }, { pubsub }) => {
            const subTitle = { listTitle: listTitle };
            const result = await Board.findByIdAndUpdate({ _id: id }, { $push: { list: subTitle } }, { new: true });
            pubsub.publish(LIST_ADDED, {
                newLists: result,
            });
            return result;
        },

        createComments: async (_, { id1, id2, content }, { pubsub }) => {
            // https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
            // nested array 참고 사이트
            const subComment = { content: content };
            const result = await Board.findOneAndUpdate({ _id: id1, "list._id": id2 }, { $push: { "list.$.taskIds": subComment } }, { new: true });
            // console.log(result);
            pubsub.publish(LIST_ADDED, {
                newLists: result,
            });

            return result;
        },

        dropBoard: async (_, { id }, { pubsub }) => {
            await Board.findByIdAndRemove({ _id: id }, { new: true });
            const result = await Board.find();
            pubsub.publish(BOARD_ADDED, {
                newBoard: result,
            });

            return "SUCCESS";
        },

        dropList: async (_, { Boardid, Listid }, { pubsub }) => {
            var dropID = { _id: Listid };
            const result = await Board.findOneAndUpdate({ _id: Boardid }, { $pull: { list: dropID } }, { new: true });

            pubsub.publish(LIST_ADDED, {
                newLists: result,
            });

            return "SUCCESS";
        },

        dropComment: async (_, { Boardid, Listid, Commentid }, { pubsub }) => {
            var dropID = { _id: Commentid };
            const result = await Board.findOneAndUpdate({ _id: Boardid, "list._id": Listid }, { $pull: { "list.$.taskIds": dropID } }, { new: true });

            pubsub.publish(LIST_ADDED, {
                newLists: result,
            });

            return "SUCCESS";
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(BOARD_ADDED),
        },
        newLists: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(LIST_ADDED),
        },
    },
};

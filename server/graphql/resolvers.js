import Board from "../models/board";

const BOARD_UPDATE = "BOARD_UPDATE";
const LIST_UPDATE = "LIST_UPDATE";

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
            const boardBox = { title };
            const result = await Board.create(boardBox);

            pubsub.publish(BOARD_UPDATE, {
                newBoard: result,
            });

            return result;
        },

        createLists: async (_, { id, listTitle }, { pubsub }) => {
            const subListTitle = { listTitle: listTitle };
            const result = await Board.findByIdAndUpdate({ _id: id }, { $push: { list: subListTitle } }, { new: true });

            pubsub.publish(LIST_UPDATE, {
                newLists: result,
            });

            return result;
        },

        createComments: async (_, { boardID, listID, content }, { pubsub }) => {
            // https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
            // nested array 참고 사이트
            const subComment = { content: content };
            const result = await Board.findOneAndUpdate({ _id: boardID, "list._id": listID }, { $push: { "list.$.taskIds": subComment } }, { new: true });

            pubsub.publish(LIST_UPDATE, {
                newLists: result,
            });

            return result;
        },

        dropBoard: async (_, { boardID }, { pubsub }) => {
            await Board.findByIdAndRemove({ _id: boardID }, { new: true });
            const result = await Board.find();

            pubsub.publish(BOARD_UPDATE, {
                newBoard: result,
            });

            return "SUCCESS";
        },

        dropList: async (_, { boardID, listID }, { pubsub }) => {
            var dropID = { _id: listID };
            const result = await Board.findOneAndUpdate({ _id: boardID }, { $pull: { list: dropID } }, { new: true });

            pubsub.publish(LIST_UPDATE, {
                newLists: result,
            });

            return "SUCCESS";
        },

        dropComment: async (_, { boardID, listID, commentID }, { pubsub }) => {
            var dropID = { _id: commentID };
            const result = await Board.findOneAndUpdate({ _id: boardID, "list._id": listID }, { $pull: { "list.$.taskIds": dropID } }, { new: true });

            pubsub.publish(LIST_UPDATE, {
                newLists: result,
            });

            return "SUCCESS";
        },

        changePosition: async (_, { boardID, ListAll }) => {
            await Board.findByIdAndUpdate({ _id: boardID }, ListAll, { new: true });

            return "SUCCESS";
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(BOARD_UPDATE),
        },
        newLists: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(LIST_UPDATE),
        },
    },
};

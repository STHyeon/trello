import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    title: String,
    published_date: { type: Date, default: Date.now },
    list: [
        {
            listTitle: String,
            taskIds: [
                {
                    content: String,
                    published_date: { type: Date, default: Date.now },
                },
            ],
        },
    ],
});

export default mongoose.model("Board", BoardSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    title: String,
    list: [
        {
            Today: String,
        },
    ],
});

export default mongoose.model("Board", BoardSchema);

import mongoose from "mongoose";

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    message: String,
    user: String
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;
import mongoose from "mongoose";

const CountSchema = new mongoose.Schema({
    index: { type: Number, required: true },
    type: { type: String, unique: true },
});

export default mongoose.model("Count", CountSchema);

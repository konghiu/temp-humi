import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
    {
        index: { type: Number, unique: true },
        temp: { type: Number, required: true },
        humi: { type: Number, required: true },
        date: { type: Date, default: new Date() },
    },
    { timestamp: true }
);

export default mongoose.model("Data", DataSchema);

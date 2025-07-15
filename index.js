import express from "express";
import connect, { status } from "./src/db/index.js";
import dataRoute from "./src/routes/dataRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 3000;

// connect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/data", dataRoute);
app.use("/", async (req, res) => {
    // res.status(200).send(status);
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        res.status(200).json({
            message: "MongoDB connected successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, (error) => {
    if (!error) console.log("http://localhost:" + PORT);
    else console.log("Error occurred, server can't start", error);
});

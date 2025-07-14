import express from "express";
import connect, { status } from "./src/db/index.js";
import dataRoute from "./src/routes/dataRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/", (req, res) => {
    res.status(200).send(status);
});
app.use("/data", dataRoute);

app.listen(PORT, (error) => {
    if (!error) console.log("http://localhost:" + PORT);
    else console.log("Error occurred, server can't start", error);
});

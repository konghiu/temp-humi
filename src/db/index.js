import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export let status = "ok";

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://conghieudev3104:XByQ2w8VYY5ezQtp@cluster0.gjho4bw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        status = "alright";
        console.log("connect successfull");
    } catch (err) {
        console.log("connect failure");
        status = "error";
    }
}

export default connect;

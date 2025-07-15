import mongoose from "mongoose";

export let status = "ok";
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        status = "alright";
        console.log("connect successfull");
    } catch (err) {
        console.log("connect failure");
        status = "error";
        // connect();
    }
}

export default connect;

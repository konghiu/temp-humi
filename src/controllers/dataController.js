import Count from "../models/Count.js";
import Data from "../models/Data.js";

let status_lamb = 0;
let status_fan = 0;

const status = {
    AUTO: 0,
    ON: 1,
    OFF: 2,
};

const dataController = {
    dataPost: async (req, res) => {
        try {
            console.log(req.body);
            const count = await Count.findOne({ type: "count" });
            const data = new Data({
                index: count.index,
                temp: req.body.temp,
                humi: req.body.humi,
                date: new Date(),
            });
            await data.save();
            await count.updateOne({ $inc: { index: 1 } });
            await count.save();
            res.status(200).send("successful");
        } catch (err) {
            console.log(err);
            res.status(300).send("failure");
        }
    },
    dataGet: async (req, res) => {
        try {
            const data = await Data.find();
            // await new Count({ type: "count", index: 0 }).save();
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "ERROR" });
        }
    },
    dataDel: async (req, res) => {
        try {
            if (req.body.code == process.env.CODE_DEL) {
                await Data.deleteMany({});
                await (
                    await Count.findOneAndUpdate(
                        { type: "count" },
                        { $set: { index: 0 } }
                    )
                ).save();

                res.status(200).json({ message: "Successful" });
            } else {
                res.status(202).json({ message: "Code invalid" });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "ERROR" });
        }
    },
    dataGetNow: async (req, res) => {
        try {
            const count = await Count.findOne({ type: "count" });
            if (count != 0) {
                const data = await Data.findOne({ index: count.index - 1 });
                res.status(200).json({ data, status_fan, status_lamb });
            } else {
                res.status(201).json({ message: "deo co cc j", data: null });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "ERROR" });
        }
    },
    postButtonController: async (req, res) => {
        const control = req.body;
        if (control.button == "fan") status_fan = status[control.status];
        else status_lamb = status[control.status];
        console.log(control);
        res.status(200).json({ message: "OK" });
    },
    getButtonController: async (req, res) => {
        console.log({ status_lamb, status_fan });
        res.status(200).json({ status_lamb, status_fan });
    },
};

export default dataController;

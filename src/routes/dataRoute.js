import express from "express";
import dataController from "../controllers/dataController.js";

const dataRoute = express.Router();

dataRoute.get("/", dataController.dataGet);
dataRoute.post("/", dataController.dataPost);
dataRoute.delete("/", dataController.dataDel);
dataRoute.get("/now", dataController.dataGetNow);
dataRoute.get("/status", dataController.getButtonController);
dataRoute.post("/status", dataController.postButtonController);

export default dataRoute;

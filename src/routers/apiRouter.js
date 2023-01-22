import express from "express";
import {registerView} from "../controllers/videoController";

const apiRouter = new express();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);

export default apiRouter;
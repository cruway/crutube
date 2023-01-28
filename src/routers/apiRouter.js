import express from "express";
import {createComment, registerView} from "../controllers/videoController";

const apiRouter = new express();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
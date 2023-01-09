import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session";
import {localsMiddleware} from "./middlewares";
import MongoStore from "connect-mongo";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/crutube" })
    })
);

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
       console.log(sessions);
       next();
    });
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
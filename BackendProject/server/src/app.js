import express from 'express';
import cors from 'cors';
import cookies from 'cookie-parser';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))

app.use(express.static("public"))
app.use(cookieParser())


// routes import

import userRouter from './router/user.routes.js'


// routes decleration
app.use("/api/v1/users", userRouter)

export {app};
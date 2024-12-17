// require('.env').config({path: './env'})
import dotenv from"dotenv"
import connetDB from './db/index.js';
import { app } from "./app.js";


dotenv.config({
    path: './.env'
})



connetDB()
.then(() => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(`Server is running at ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.error("Couldn't connect to Database", err);
})












/*
import express from 'express';
const app = express;

(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/{DB_NAME}`);
       app.on('error : ', error => {
        console.error(error);
        throw error;
       } );
       app.listen(process.env.PORT, () => {
        console.log(`server is runing on port ${process.env.PORT}` )
       })
    } catch (error) {
        console.error("database connection error", error);
        throw Error
    }
})()

*/
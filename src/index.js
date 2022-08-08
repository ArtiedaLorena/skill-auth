import express from 'express';
import moongose from "mongoose";
import passport from "passport";
import session from 'express-session';
import dotenv from "dotenv";
import morgan from "morgan";

import "./auth/local.js"

import v1Routes from "./v1/routes/index.js"


const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret:"secretito",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.use("/", v1Routes)

moongose.connect(process.env.CHANCHITO,{ userNewUrlParser: true})
    .then(()=> console.log("Conectando a la base de datos"))
    .catch(err =>console.log(err))

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
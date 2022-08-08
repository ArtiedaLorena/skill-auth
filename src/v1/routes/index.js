import express from "express";
import passport from "passport";

const router = express.Router()

router
    .get("/auth/login", (req, res, next)=>{
        res.send("Login")
    })

    .post("auth/login", passport.authenticate("local-login",{
        successRedirect: "/profile",
        failureRedirect: "auth/login",
        passReqToCallback:true

    }))
    .get("register",(req, res)=>{
        res.send("register page")
    })
    .post("auth/register", passport.authenticate("local-register",{
        successRedirect: "/profile",
        failureRedirect: "auth/register",
        passReqToCallback:true


    }))

router
    .get("/profile", isLoggedIn,(req,res)=>{
        res.send("profile")
    })

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect("/auth/login")
    }
    
    export default router
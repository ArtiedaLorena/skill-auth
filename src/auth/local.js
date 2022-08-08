import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/users.js";

//Logica de autenticacion

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const therIsUser = await User.findOne({ username: username });

      if (therIsUser) {
        return done(null, false, { message: "Username is already taken" });
      } else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use("local-login", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
}, async(req,username,password,done)=>{
    const user = await User.findOne({ username: username})

    if (!user){
        return done(null,false,{message:"User does not exists"})


    }

    if(!user.validatePassword(password)){
        return done(null, false, {message:"Password does not match"})
    }

    done(null, user)
}))

export default passport;

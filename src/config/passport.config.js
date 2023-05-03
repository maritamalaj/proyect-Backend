import passport from 'passport'
import local from "passport-local";
import GitHubStrategy from 'passport-github2';

import usersModel from '../dao/models/users.models.js';
import { createHash, isValidPassword } from '../encrypt.js';

// Declaramos nuestra estrategia de register
const LocalStrategy = local.Strategy;

const initializePassport= () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
    }, async (req, username, password, done)=>{

        const {first_name, last_name, email} = req.body;

        try {
            const user = await usersModel.findOne({email: username}).lean().exec();
            if (user){
                return done({passportError:'Usuario ya existente en la base de datos'}, false)
            }
            const newUser = await usersModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: createHash(password)
            })

            return done(null, newUser)

        } catch (error) {
            return done({catchErrorPassport:'Error al obtener usuarios', error})
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done)=>{
        try {

            const user = await usersModel.findOne({email: username}).lean().exec();
            if(!user){
                console.log('NO USER: No hay usuario registrado con ese email');
                return done(null, false)

            }
            if (!isValidPassword(user, password)){
                console.log('INCORRECT PASSWORD: Contraseña incorrecta');
                return done(null, false)
            }

            return done(null, user)

        } catch (error) {
            return done('PASSPORT_ERROR: ', error)
        }
    
}));

//estrategia github
passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.f98ff3af02707906',
    clientSecret: '055bd57cc207cb9d2c260462622c30fe7ad83e52',
    callbackURL: 'http://127.0.0.1:8080/session/githubcallback',
    scope:['user:email']
}),
async(accessToken, refreshToken, profile, done)=>{
    console.log(profile);
    try {
        const user = await usersModel.findOne({email:profile.emails[0].value})
        if (user) return done(null, user);

        const newUser = await usersModel.create({
            first_name:profile._json.name,
            last_name:'',
            email: profile.emails[0].value,
            password: '',
            loggedBy: "GitHub"
        })
        return done(null, newUser)
    } catch (error) {
        return done('Error to login with GitHub: ',error)

    }
})

passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=>{
    const user = await usersModel.findById(id).lean().exec()
    done(null, user)
})


};

export default initializePassport;

   

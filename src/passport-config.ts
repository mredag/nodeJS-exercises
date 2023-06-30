import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import  db  from './config/db'
dotenv.config();

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

passport.use(new Strategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try {
        const user = await db.one('SELECT * FROM users WHERE id = $1', [payload.id]);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

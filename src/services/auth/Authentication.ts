import passport, { PassportStatic } from 'passport';
import jwt from 'jsonwebtoken';
import { NotFoundError } from 'objection';
import User from '../../models/User';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import Email from '../email/Email';

const bearerStrategy = BearerStrategy.Strategy;
const localStrategy = LocalStrategy.Strategy;

/**
 * Authentication class handling passport.
 */
export default class Authentication {

    /**
     * passport instance to load up strategies onto.
     */
    public static passport: PassportStatic = passport;

    /**
     * bcrypt instance
     */
    public static bcrypt = bcrypt;

    /**
     * Token lifetime in days.
     */
    public static tokenLifetimeDays: number = 30;

    /**
     * Salt rounds for hash
     */
    protected static saltRounds: number = 12;

    /**
     * Set up strategies on passport.
     */
    public static setupPassport() {
        this.setupLocalStrategy();
        this.setupBearerStrategy();
    }

    /**
     * Generate password hash for database.
     * @param password string
     */
    public static makeHashedPassword(password: string) {
        return this.bcrypt.hashSync(password, bcrypt.genSaltSync(this.saltRounds));
    }

    /**
     * Set up the local authentication strategy
     */
    protected static setupLocalStrategy() {
        /**
         * Local strategy to check email
         */
        this.passport.use(new localStrategy({
            usernameField: 'email'
        }, (async (email: string, password: string, done: Function) => {

            let user = await User.query().findOne({ email });

            // if no user
            if (!user) return done(new NotFoundError());


            // bad password 
            if (!this.bcrypt.compareSync(password, user.password)) return done('Unauthorized');

            // authenticate
            return done(null, user);
        })));
    }

    /**
     * Set up bearer strategy
     */
    protected static setupBearerStrategy() {
        this.passport.use(new bearerStrategy(
            async (token, done) => {

                // Here we decode the token
                let tokenData = await Authentication.readToken(token);
                if (this.checkTokenLife(tokenData)) {
                    return done(null, tokenData);
                } else {
                    return done("NO! token life failed?");
                }

            }
        ))
    }

    /**
     * Check the life of a token.
     */
    public static checkTokenLife(token: any): boolean {

        return dayjs().isBefore(dayjs(token.expires))
    }

    /**
     * Authentication middleware. This authenticates
     * a request by bearer token by default but can
     * be set to `local` for password check.
     */
    public static authenticate(type: string = "bearer") {
        this.setupPassport();
        return this.passport.authenticate(type, { session: false })
    }

    /**
     * Generate a web token.
     */
    public static generateWebToken(data: any, days?: number, unit?: any) {
        return new Promise((resolve, reject) => {
            try {
                const daysToAdd = (days) ? days : this.tokenLifetimeDays;
                console.log(daysToAdd);
                let expires = dayjs().add((days) ? days : this.tokenLifetimeDays, (unit) ? unit : 'day');
                resolve(jwt.sign(JSON.stringify({ ...data, expires }), process.env.JWT_SECRET));
            }
            catch (e) {

                reject(e);
            }
        });
    }

    /**
     * Read contents of JWT
     */
    public static readToken = async (token: string) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }

    public static sendConfirmationEmail = (user: any): void => {
        (new Email()).to(user.email).subject("Please confirm your email.").body("Email confirm here");
    }


    public static userVerifyEmail = (user: any): void => {

    }


    public static sendPasswordResetEmail = (user: any): void => {
        (new Email()).to(user.email).subject("Password reset").body("Password reset here");
    }
}
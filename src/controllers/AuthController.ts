import express, { Router } from 'express';
import Network from '../models/Network';
import { Event, Authentication, Email } from '../services';
import User from '../models/User';
const AuthController: Router = express.Router();

/**
 * Log in a user.
 */
AuthController.post('/token', Authentication.authenticate('local'), async (req: any,res: any ) => {
    delete req.user.password;
    let token = await Authentication.generateWebToken(req.user);
    res.json({ user: req.user, token });
});


/**
 * Log out.
 */
AuthController.post('/logout', (req: any, res: any) => {
    req.logout();
    res.send(200);
});

/**
 * Log out.
 */
AuthController.get('/verify', Authentication.authenticate(),
async (req, res, next) => {
    res.json(req.user);
});


/**
 * Register a new user.
 */
AuthController.post('/register', async (req: any, res: any) => {
    let newUser = await User.query().insertAndFetch(Object.assign({
        email: req.body.email,
        password: Authentication.makeHashedPassword(req.body.password),
        email_confirmed: false,
        created_at: new Date(),
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }, {}))
    delete newUser.password;
    new Event('auth-new-user', newUser);
    res.send(newUser);
});

/**
 * Delete User
 */
AuthController.delete('/:id', (req: any, res: any) => {
    // delete user
});

/**
 * Delete User
 */
AuthController.get('/networks', Authentication.authenticate(), (req: any, res: any) => {
   //
});

AuthController.get('/email/verify-token', async (req: any, res: any) => {

    let payload: any = await Authentication.readToken(req.query.t);
    if(Authentication.checkTokenLife(payload))
    {
        await User.query().findById(payload.id).update({email_confirmed: true});
        new Event("auth-email-confirmed", payload.email );
        // put a redirect here.
        //res.redirect()
        res.send('email confirmed');
    } else {
        res.send('Token expired');
    }
 });

 AuthController.post('/email/send-email-verification', Authentication.authenticate(), async (req: any, res: any) => {
    
        const verificationToken = await Authentication.generateWebToken(req.user, 1);
        await 
        (new Email)
        .from(process.env.MAILGUN_FROM)
        .to(req.user.email)
        .body(`<a href="${process.env.API_BASE}/auth/email/verify-token?t=${verificationToken}">Verify Email</a>`)
        .send();
        res.send(200);
 })

export default AuthController;

import Network from '../models/Network';
import Profile from '../models/Profile';

export default {

    /** 
     * Checks if the network exists & is valid.
     */
    networkCheck: async (req: any, res: any, next: any) => {

        const networkQuery = await Network.query().where('name', req.params.network);
        if (networkQuery.length > 0) {
            req.network = networkQuery[0]
            next();
        } else {
            res.send("Invalid network", 400);
        }
    },

    /**
     * Checks if the user is in the network and loads
     * profile.
     */
    userInNetwork: async (req: any, res: any, next: any) => {

        // check if the user has been hydrated in the request.
        if (!req.user) {
            res.send("Unauthenticated", 401);
        }
        let profile = await Profile.query().where('network_id', req.network.id).andWhere('user_id', req.user.id);
        if (profile && profile.length > 0) {
            req.profile = profile[0];
            next();
        } else {
            res.send("Unauthenticated", 401);
        }
    },


}
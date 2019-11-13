import express, { Router } from 'express';
import { Authentication } from '../services';
import NetworkAuthorization from '../middleware/NetworkAuthorization';
const NewsFeedController: Router = (express.Router()).use(Authentication.authenticate(),  NetworkAuthorization.userInNetwork);
import Post from '../models/Post';


NewsFeedController.get('/', Authentication.authenticate(),  NetworkAuthorization.userInNetwork, async (req: any, res: any) => {

    res.send(
        await Post.query()
        .join('followers', {'posts.profile_id': 'followers.followee_id'})
        .where('follower_id', req.user.id)
        .orWhere('profile_id', req.user.id)
        .orderBy('created_at', 'DESC')
        .eager('profile')
        .eager('comments.[profile]')
    )
});

export default NewsFeedController;

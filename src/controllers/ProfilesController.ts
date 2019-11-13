import express, { Router } from 'express';
import { Authentication, Event } from '../services';
import Profile from '../models/Profile'
import Post from '../models/Post';
import db from '../database/Database';
import NetworkAuthorization from '../middleware/NetworkAuthorization';
import User from '../models/User';

const ProfilesController: Router = (express.Router()).use(Authentication.authenticate(),  NetworkAuthorization.userInNetwork);

/**
 * Create a profile
 */
ProfilesController.post('/',  async (req: express.Request, res: express.Response) => {
    try {
        res.send(await Profile.query().insert(Profile.fromJson(req.body)))
        new Event('profile-created');
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

/**
 * Get all profiles
 */
ProfilesController.get('/', async (req: any, res: any) => {
    return res.send(await Profile.query().orderBy('id').eager('posts').page(req.query.page || 0, 25));
});

/**
 * Get
 */
ProfilesController.get('/:id', async (req: express.Request, res: express.Response) => {
    res.send(await Profile.query().findById(req.params.id));
});

/**
 * Edit post
 */
ProfilesController.patch('/:id', async (req: any, res: any) => {
    try {
        let post = await Profile.query().findById(req.params.id);
        res.send(await Profile.query().findById(req.params.id).patchAndFetchById(req.params.id, req.body));
        new Event('profile-updated');
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

/**
 * Delete a post
 */
ProfilesController.delete('/:id', async (req: any, res: any) => {
    res.send(await Profile.query().deleteById(req.params.id));
});


/**
 * Get all posts from a user
 */
ProfilesController.get('/:id/posts', async (req: express.Request, res: express.Response) => {
    res.send(await Post.query().where('profile_id', req.params.id).page(req.query.page || 0, 25));
});

/**
 * Get all posts from a user
 */
ProfilesController.get('/:id/followers', async (req: express.Request, res: express.Response) => {

    let followers = (await db.queryBuilder()
        .select(['followee_id', 'follower_id']).from('followers')
        .where('followee_id', req.params.id))
        .map(result => {
            return result.follower_id
        });
    res.send(await Profile.query().findByIds(followers).page(req.query.page || 0, 25));
});

/**
 * Get all followers
 */
ProfilesController.get('/:id/following', async (req: any, res: express.Response) => {
    let following = (await db.queryBuilder()
        .select(['followee_id', 'follower_id']).from('followers')
        .where('follower_id', req.params.id))
        .map(result => {
            return result.followee_id
        });
    res.send(await Profile.query().findByIds(following).page(req.query.page || 0, 25));
});

/**
 * Follow a profiles
 */
ProfilesController.post('/:id/follow', async (req: express.Request, res: express.Response) => {
    const followee = await Profile.query().findById(req.params.id);

    await db('followers')
    .insert({
        followee_id: followee.id,
        follower_id: req.user.id,
        created_at: new Date()
    })
    new Event("new-follower", followee);
    res.send(200);
});

/**
 * Un-follow a profile
 */
ProfilesController.post('/:id/unfollow', async (req: express.Request, res: express.Response) => {
    const unfollowee = await Profile.query().findById(req.params.id);
    await db.queryBuilder()
    .table('followers')
    .where('follower_id', req.user.id)
    .andWhere('followee_id', unfollowee.id)
    .delete();
    res.send(200);
});

/**
 * Block a user
 */
ProfilesController.post('/:id/block', async (req: any, res: any) => {
    const user = await User.query().findById(req.user.id);
    let blockedUsers = user.blocked_users;
    blockedUsers.blocked_users.push(Number(req.params.id));
    await User.query().findById(req.user.id).update(User.fromJson({ blocked_users: blockedUsers }));
    res.send(200);
});

/**
 * Unblock a user
 */
ProfilesController.post('/:id/unblock', async (req: any, res: any) => {
    const user = await User.query().findById(req.user.id);
    let blockedUsers = user.blocked_users;
    let index = blockedUsers.blocked_users.indexOf(Number(req.params.id));
    if(index > -1)
    {
        blockedUsers.blocked_users.splice(index,1);
    }
    await User.query().findById(req.user.id).update(User.fromJson({ blocked_users: blockedUsers }));
    res.send(200);
});






export default ProfilesController;
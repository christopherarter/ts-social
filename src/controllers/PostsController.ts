import express, { Router } from 'express';
import { Authentication, Event } from '../services';
import Comment from '../models/Comment';
import Post from '../models/Post'
import NetworkAuthorization from '../middleware/NetworkAuthorization';
import PostsPolicy from '../services/policies/PostsPolicy';
const PostsController: Router = (express.Router()).use(Authentication.authenticate(),  NetworkAuthorization.userInNetwork);

/**
 * Create post
 */
PostsController.post('/', async (req: any, res: any) => {
    try {
        res.send(await Post.query().insert(Post.fromJson({
            network_id: req.network.id,
            profile_id: req.profile.id,
            created_at: new Date(),
            content: req.body.content
        })))
        new Event('post-created');
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

// /**
//  * Get posts
//  */
// PostsController.get('/', async (req: express.Request, res: express.Response) => {
//     return res.send(await Post.query().orderBy('id').eager('comments.[profile]').page(req.query.page || 0, 25));
// });

/**
 * Get single post
 */
PostsController.get('/:id', async (req: express.Request, res: express.Response) => {
    res.send(await Post.query().findById(req.params.id).eager('comments.[profile]'));
});

/**
 * Edit posts
 */
PostsController.patch('/:id', async (req: any, res: any)  => {

        let post = await Post.query().findById(req.params.id);

        if(PostsPolicy.profileOwns(post, req.profile)) {
            res.send(await Post.query().patchAndFetchById(req.params.id, { ...req.body, updated_at: new Date() }))
            new Event('post-updated');
        } else {
            res.send("Unauthorized");
        }
       

});

/**
 * Delete a post
 */
PostsController.delete('/:id', async (req: any, res: any)  => {
    let post = await Post.query().findById(req.params.id);

    if(PostsPolicy.profileOwns(post, req.profile)) {
        res.send(await Post.query().deleteById(post.id));
        new Event('post-deleted');
    } else {
        res.send("Unauthorized");
    }

   
});

/**
 * Add new comment to a post!
 */
PostsController.post('/:id/comments', async (req: express.Request, res: express.Response)  => {
    res.send(await Comment.query().insertAndFetch(Object.assign({
        post_id: req.params.id,
        profile_id: 1
    }, req.body)));
});

/**
 * Add new comment to a post!
 */
PostsController.get('/:id/comments', async (req: express.Request, res: express.Response) => {
    res.send( await Comment.query().where('post_id', req.params.id).eager('profile') );
});
export default PostsController;
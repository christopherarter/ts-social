import express from 'express';
import {Event } from '../services';
import Post from '../models/Post';
import PostsPolicy from '../services/policies/PostsPolicy';
const CommentsController = express.Router();
import Comment from '../models/Comment'
import { CommentsPolicy } from 'src/services/policies';
// CommentsController.use(Authentication.authenticate());

/**
 * Create Comment
 */
CommentsController.post('/', async (req: any, res: express.Response) => {

    const post = await Post.query().findById(req.params.post_id);
    if (PostsPolicy.profileCanView(post, req.user)) {
        try {
            res.send(await Comment.query().insert(Comment.fromJson({
                post_id: req.params.post_id,
                profile_id: req.profile.id,
                content: req.body.content,
                created_at: new Date()
            })))
            new Event('post-created');
        } catch (e) {
            console.log(e);
        }
    } else {
        res.send(401);
    }

});

/**
 * Get Comments
 */
CommentsController.get('/', async (req: any, res: any) => {
    const post = await Post.query().findById(req.params.post_id);

    if (PostsPolicy.profileCanView(post, req.user)) {
        try {
            res.send(await Comment.query().where('post_id', req.params.post_id).orderBy('id').page(req.query.page || 0, 25));
        } catch (e) {
            console.log(e);
        }
    } else {
        res.send(400);
    }
});

/**
 * Get single comment
 */
CommentsController.get('/:id', async (req: express.Request, res: express.Response) => {
    res.send(await Comment.query().where('id', req.params.id).andWhere('post_id', req.params.post_id));
}); 

/**
 * Edit comment
 */
CommentsController.patch('/:id', async (req: any, res: any) => {

    const post = await Post.query().findById(req.params.post_id); 
res.send(post);
    // if (PostsPolicy.profileCanView(post, req.user)) {
    //     try {
    //         res.send(await Comment.query()
    //             .where('id', req.params.id)
    //             .andWhere('post_id', req.params.post_id)
    //             .patchAndFetchById(req.params.id, Comment.fromJson({
    //                 content: req.body.content,
    //             })));
    //         new Event('post-updated');
    //     } catch (e) {
    //         console.log(e);
    //         res.send(e);
    //     }
    // } else {
    //     req.send(401);
    // }
});

/**
 * Delete a comment
 */
CommentsController.delete('/:id', async (req: any, res: any) => {
    res.send(await Comment.query().deleteById(req.params.id));
});


export default CommentsController; 
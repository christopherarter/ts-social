import express, { Router } from 'express';
import PostsController from './controllers/PostsController';
import ProfilesController from './controllers/ProfilesController';
import CommentsController from './controllers/CommentsController';
import NewsFeedController from './controllers/NewsFeedController';
import NetworksController from './controllers/NetworksController';
import NetworkAuthorization from './middleware/NetworkAuthorization';
import AuthController from './controllers/AuthController';
const ApplicationRouter: Router = (express.Router()).use(express.json());

/**
 * These route declarations match up to
 * the API Gateways described in the
 * serverless.yaml file.
 * 
 * All of these routes must have NetworkAuthorization middleware
 * applied to hydrate the `network` property of the request body
 * utilized by other middleware and policies later.
 */

// network auth -> get user -> get profile for network ->
ApplicationRouter.use('/:network/posts', NetworkAuthorization.networkCheck, PostsController);
ApplicationRouter.use('/:network/posts/:post_id/comments', NetworkAuthorization.networkCheck, PostsController)
// ApplicationRouter.use('/:network/comments', NetworkAuthorization.networkCheck, CommentsController);
ApplicationRouter.use('/:network/profiles', NetworkAuthorization.networkCheck, ProfilesController);
ApplicationRouter.use('/:network/feed', NetworkAuthorization.networkCheck, NewsFeedController);
ApplicationRouter.use('/networks', NetworksController);
ApplicationRouter.use('/auth', AuthController )

export default ApplicationRouter;
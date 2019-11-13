import serverless from 'serverless-http';
import express from 'express';
import ApplicationRouter from './router';
const app = express();
app.use(ApplicationRouter)
const handler = serverless(app);

export { handler }; 
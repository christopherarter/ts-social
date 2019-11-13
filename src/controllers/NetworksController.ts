import express, { Router } from 'express';
import { Authentication, Event } from '../services';
import NetworkAuthorization from '../middleware/NetworkAuthorization';
const NetworksController: Router = express.Router();
import Network from '../models/Network';


NetworksController.get('/', async (req: any, res: any) => {
    res.send(await Network.query()
    .select([
        'networks.*',
        Network.relatedQuery('members').count().as('members_count')
    ]).where('visible', true)

    );
});

NetworksController.post('/', async (req: any, res: any) => {
    res.send( await Network.query().insertAndFetch(req.body) );
});

export default NetworksController;
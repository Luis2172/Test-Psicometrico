
import { Router } from 'express';
import { ResultRoutes } from '../controllers/routes';

export class AppRoutes{

    static get routes(): Router{
        const router = Router();

        router.use('/api/results', ResultRoutes.routes );

        return router;
    }
}

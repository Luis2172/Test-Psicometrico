
import { Router } from 'express';
import { ResultController } from './result.controller';

export class ResultRoutes{


    static get routes(): Router{
        const router = Router();

        const resultController = new ResultController();

        router.post('/', resultController.saveResult );
        router.get('/', resultController.getReult );

        return router;
    }
}

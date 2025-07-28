import express, { Router } from 'express'
import cors from 'cors'

interface Options{
    port: number,
    routes: Router
}

export class Server{
    private app = express();
    private readonly port: number;
    private readonly routes: Router

    constructor( options: Options ){
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){

        //* Middlewares
        this.app.use(cors());
        this.app.use(express.json()); // Para procesar JSON en las peticiones

        //* Routes
        this.app.use( this.routes );

        this.app.listen( this.port , () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${ this.port }`);
          });

        this.app.get('/', (req, res) => {
            res.send('Servidor funcionando correctamente ✔️');
            });
    }
}
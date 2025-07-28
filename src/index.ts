import 'dotenv/config';
import { connectDB } from './data/db';
import { envs } from './config/envs';
import { Server } from './server';
import { AppRoutes } from './routes/result.routes';

const port = Number( envs.PORT) || 3000;


(async () => {
  main(); 
})();

async function main() {

    console.log('Inicializando backend')

    //* Conexion a MongoDB
    await connectDB.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    });

    //* Arranque del servidor y Routes
    const server = new Server( { port , routes: AppRoutes.routes } );
    server.start();
    //const server = new Server( { port: envs.PORT, routes: AppRoutes.routes } );

}; 

import mongoose from 'mongoose';

interface ConnectionOption{
    mongoUrl: string,
    dbName: string
}

export class connectDB{
    static async connect( options: ConnectionOption ){
        const { mongoUrl, dbName } = options;
        try {
                await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log('✅ Conectado a MongoDB:', dbName);
        } catch (error) {
            console.error('❌ Error al conectar a MongoDB:', error);
            process.exit(1);
        }
    }
  
};
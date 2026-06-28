

import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),

    EMAIL_FROM: env.get('EMAIL_FROM').required().asString(),
    RESEND_API_KEY: env.get('RESEND_API_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
    
};
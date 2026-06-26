import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerOptions: SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Endpoints docs',
            version: '1.0.0',
            descripcion: 'Rutas',
        },
    },
    // apis: ['./src/routes/*.routes.ts'],
};

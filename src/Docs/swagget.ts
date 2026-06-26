import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.3',
    info: {
        title: 'DOC MEV-SERVER',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3005',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
        schemas: {
            modelos: {
                type: 'object',
                required: ['nombre', 'nivelImportancia'],
                properties: {
                    id: {
                        type: 'number',
                    },
                    nombre: {
                        type: 'string',
                    },
                    nivelImportancia: {
                        type: 'number',
                    },
                    idTipoModelo: {
                        type: 'number',
                    },
                    nombreTipoModelo: {
                        type: 'string',
                    },
                    habilitaFeria: {
                        type: 'boolean',
                    },
                    habilitado: {
                        type: 'boolean',
                    },
                    idSituacionExpedienteCrear: {
                        type: 'number',
                    },
                    estadoInicial: {
                        type: 'string',
                    },
                    nombreExtracto: {
                        type: 'string',
                    },
                    idEstadoProcesalExpedienteCrear: {
                        type: 'number',
                    },
                    idDespachoExpedienteCrear: {
                        type: 'number',
                    },
                    idDespachoExpedienteAsignado: {
                        type: 'number',
                    },
                    formaProtocolo: {
                        type: 'boolean',
                    },
                    emailNotificacion: {
                        type: 'string',
                    },
                    organismoTrnLotus: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/modules/modelos/modelos.routes.ts'],
};

export default swaggerJSDoc(swaggerOptions);

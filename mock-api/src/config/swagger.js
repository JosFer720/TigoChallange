const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mock API Service',
      version: '1.0.0',
      description: 'API REST para configurar y gestionar mocks de endpoints',
      contact: {
        name: 'API Support',
        email: 'support@mockapi.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Configurations',
        description: 'Gestión de configuraciones de mock'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsDoc(swaggerOptions);
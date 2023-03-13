import swaggerJSDoc from 'swagger-jsdoc';

/* Swagger Setup */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chef API for cooking up recipes',
    version: '1.0.0',
    description:
      'Chef Cooks up Recipes and Serves them out.',
  },
  servers: [
    {
      url: 'http://localhost:9090',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // apis: ['./routes/*.js'],
  apis: ['**/*.ts'],
  // apis: ['./routes/*.ts', './schemas/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
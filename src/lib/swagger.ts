import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Giverr API Doc',
        version: '1.0',
        description: 'This is the API documentation of the application.',
      },
      // components:{
      //   securitySchemes: {
      //       BearerAuth: {
      //           type: 'http',
      //           scheme: 'bearer',
      //           bearerFormat: 'JWT',
      //       },
      //   },
      // },
      security: [],
    },
  });
  return spec;
};

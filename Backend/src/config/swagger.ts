// Static OpenAPI 3 spec served at /api/docs via swagger-ui-express.
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description: 'REST API for the storefront and admin panel.',
  },
  servers: [{ url: '/api' }],
  components: {
    securitySchemes: {
      tokenHeader: { type: 'apiKey', in: 'header', name: 'token' },
    },
    schemas: {
      SuccessMessage: {
        type: 'object',
        properties: { success: { type: 'boolean' }, message: { type: 'string' } },
      },
      AuthResponse: {
        type: 'object',
        properties: { success: { type: 'boolean' }, token: { type: 'string' } },
      },
      Error: {
        type: 'object',
        properties: { success: { type: 'boolean', example: false }, message: { type: 'string' } },
      },
    },
  },
  paths: {
    '/user/register': {
      post: {
        tags: ['User'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Registered', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/user/login': {
      post: {
        tags: ['User'],
        summary: 'Log in a user',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } } } } },
        },
        responses: { 200: { description: 'Logged in', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } } },
      },
    },
    '/user/admin': {
      post: {
        tags: ['User'],
        summary: 'Admin login',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } } } } } },
        responses: { 200: { description: 'Logged in', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } } },
      },
    },
    '/product/list': {
      get: { tags: ['Product'], summary: 'List all products', responses: { 200: { description: 'Products' } } },
    },
    '/product/single': {
      post: {
        tags: ['Product'],
        summary: 'Get a single product',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['productId'], properties: { productId: { type: 'string' } } } } } },
        responses: { 200: { description: 'Product' } },
      },
    },
    '/product/add': {
      post: {
        tags: ['Product'],
        summary: 'Add a product (admin)',
        security: [{ tokenHeader: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name', 'description', 'price', 'category', 'subCategory', 'sizes'],
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  category: { type: 'string' },
                  subCategory: { type: 'string' },
                  sizes: { type: 'string', description: 'JSON array string, e.g. ["S","M"]' },
                  bestSeller: { type: 'string' },
                  image1: { type: 'string', format: 'binary' },
                  image2: { type: 'string', format: 'binary' },
                  image3: { type: 'string', format: 'binary' },
                  image4: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Added', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }, 401: { description: 'Unauthorised' } },
      },
    },
    '/product/remove': {
      post: {
        tags: ['Product'],
        summary: 'Remove a product (admin)',
        security: [{ tokenHeader: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } } } } },
        responses: { 200: { description: 'Removed', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }, 401: { description: 'Unauthorised' } },
      },
    },
  },
}

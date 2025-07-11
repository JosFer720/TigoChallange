const request = require('supertest');
const app = require('../src/app');
const mockService = require('../src/services/mockService');

describe('Mock API Tests', () => {
  let testConfigId;

  describe('POST /api/configs', () => {
    it('should create a new mock configuration', async () => {
      const newConfig = {
        name: 'Test API',
        path: '/test/users/:id',
        method: 'GET',
        response: {
          status: 200,
          body: {
            id: '{{params.id}}',
            name: 'Test User'
          }
        }
      };

      const response = await request(app)
        .post('/api/configs')
        .send(newConfig)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(newConfig.name);
      
      testConfigId = response.body.data.id;
    });

    it('should validate required fields', async () => {
      const invalidConfig = {
        name: 'Test API'
        // missing required fields
      };

      const response = await request(app)
        .post('/api/configs')
        .send(invalidConfig)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('GET /api/configs', () => {
    it('should return all configurations', async () => {
              const response = await request(app)
        .get('/api/configs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it('should filter configurations by method', async () => {
      const response = await request(app)
        .get('/api/configs?method=GET')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach(config => {
        expect(config.method).toBe('GET');
      });
    });
  });

  describe('GET /api/configs/:id', () => {
    it('should return a specific configuration', async () => {
      const response = await request(app)
        .get(`/api/configs/${testConfigId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testConfigId);
    });

    it('should return 404 for non-existent configuration', async () => {
      const response = await request(app)
        .get('/api/configs/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/configs/:id', () => {
    it('should update a configuration', async () => {
      const update = {
        name: 'Updated Test API',
        enabled: false
      };

      const response = await request(app)
        .put(`/api/configs/${testConfigId}`)
        .send(update)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(update.name);
      expect(response.body.data.enabled).toBe(false);
    });
  });

  describe('Mock Execution', () => {
    beforeAll(async () => {
      // Create a test mock
      const mockConfig = {
        name: 'User API Mock',
        path: '/api/test-users/:userId',
        method: 'GET',
        response: {
          status: 200,
          body: {
            id: '{{params.userId}}',
            name: 'John Doe',
            email: 'john@example.com',
            queryParam: '{{query.filter}}'
          }
        },
        rules: {
          headers: {
            'x-api-key': 'test-key'
          }
        }
      };

      await request(app)
        .post('/api/configs')
        .send(mockConfig);
    });

    it('should execute mock and return configured response', async () => {
      const response = await request(app)
        .get('/api/test-users/123?filter=active')
        .set('x-api-key', 'test-key')
        .expect(200);

      expect(response.body.id).toBe('123');
      expect(response.body.queryParam).toBe('active');
    });

    it('should return 404 when rules do not match', async () => {
      const response = await request(app)
        .get('/api/test-users/123')
        // missing required header
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/configs/:id', () => {
    it('should delete a configuration', async () => {
      const response = await request(app)
        .delete(`/api/configs/${testConfigId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');
    });
  });
});
const mockService = require('../services/mockService');
const logger = require('../utils/logger');

class MockController {
  async handleMockRequest(req, res, next) {
    try {
      const { method, path, query, headers, body } = req;
      
      logger.info(`Mock request received: ${method} ${path}`);
      
      // Buscar configuración que coincida
      const match = mockService.findMatchingConfig(method, path, { query, headers, body });
      
      if (!match) {
        logger.warn(`No mock configuration found for: ${method} ${path}`);
        return res.status(404).json({
          success: false,
          error: 'No mock configuration found for this request',
          request: {
            method,
            path,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      // Procesar respuesta dinámica
      const response = await mockService.processResponse(match.config, req, match.params);
      
      // Establecer headers personalizados
      Object.entries(response.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      
      // Log de respuesta
      logger.info(`Mock response: ${response.status} for ${match.config.name}`);
      
      // Enviar respuesta
      res.status(response.status).json(response.body);
    } catch (error) {
      logger.error(`Error handling mock request: ${error.message}`);
      next(error);
    }
  }
}

module.exports = new MockController();
const mockService = require('../services/mockService');

class ConfigController {
  // Crear nueva configuración
  async create(req, res, next) {
    try {
      const config = mockService.createConfig(req.body);
      res.status(201).json({
        success: true,
        data: config,
        message: 'Mock configuration created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todas las configuraciones
  async getAll(req, res, next) {
    try {
      const { enabled, method, path } = req.query;
      const filters = {};
      
      if (enabled !== undefined) {
        filters.enabled = enabled === 'true';
      }
      if (method) {
        filters.method = method;
      }
      if (path) {
        filters.path = path;
      }
      
      const configs = mockService.getAllConfigs(filters);
      res.json({
        success: true,
        data: configs,
        count: configs.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener configuración por ID
  async getById(req, res, next) {
    try {
      const config = mockService.getConfigById(req.params.id);
      
      if (!config) {
        return res.status(404).json({
          success: false,
          error: 'Configuration not found'
        });
      }
      
      res.json({
        success: true,
        data: config
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar configuración
  async update(req, res, next) {
    try {
      const config = mockService.updateConfig(req.params.id, req.body);
      
      if (!config) {
        return res.status(404).json({
          success: false,
          error: 'Configuration not found'
        });
      }
      
      res.json({
        success: true,
        data: config,
        message: 'Mock configuration updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

    // Eliminar configuración
  async delete(req, res, next) {
    try {
      const deleted = mockService.deleteConfig(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Configuration not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Mock configuration deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConfigController();
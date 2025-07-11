const MockConfig = require('../models/mockConfig');
const logger = require('../utils/logger');

class MockService {
  constructor() {
    this.configs = new Map();
    this.initializeDefaultMocks();
  }

  initializeDefaultMocks() {
    // Mock de ejemplo
    const exampleMock = new MockConfig({
      name: 'Example User API',
      description: 'Returns user information',
      path: '/api/users/:id',
      method: 'GET',
      response: {
        status: 200,
        body: {
          id: '{{params.id}}',
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    });
    this.configs.set(exampleMock.id, exampleMock);
  }

  // Crear configuración
  createConfig(data) {
    const config = new MockConfig(data);
    this.configs.set(config.id, config);
    logger.info(`Config created: ${config.id} - ${config.name}`);
    return config;
  }

  // Obtener todas las configuraciones
  getAllConfigs(filters = {}) {
    let configs = Array.from(this.configs.values());
    
    // Aplicar filtros
    if (filters.enabled !== undefined) {
      configs = configs.filter(c => c.enabled === filters.enabled);
    }
    if (filters.method) {
      configs = configs.filter(c => c.method === filters.method.toUpperCase());
    }
    if (filters.path) {
      configs = configs.filter(c => c.path.includes(filters.path));
    }
    
    // Ordenar por prioridad
    return configs.sort((a, b) => b.priority - a.priority);
  }

  // Obtener configuración por ID
  getConfigById(id) {
    return this.configs.get(id);
  }

  // Actualizar configuración
  updateConfig(id, data) {
    const existingConfig = this.configs.get(id);
    if (!existingConfig) {
      return null;
    }
    
    const updatedConfig = new MockConfig({
      ...existingConfig.toJSON(),
      ...data,
      id,
      createdAt: existingConfig.createdAt
    });
    
    this.configs.set(id, updatedConfig);
    logger.info(`Config updated: ${id} - ${updatedConfig.name}`);
    return updatedConfig;
  }

  // Eliminar configuración
  deleteConfig(id) {
    const config = this.configs.get(id);
    if (config) {
      this.configs.delete(id);
      logger.info(`Config deleted: ${id} - ${config.name}`);
      return true;
    }
    return false;
  }

  // Buscar configuración que coincida con la solicitud
  findMatchingConfig(method, path, request) {
    const configs = this.getAllConfigs({ enabled: true, method });

    for (const config of configs) {
      const pathMatch = this.matchPath(config.path, path);
      if (pathMatch) {
        if (this.rulesMatch(config.rules, request, pathMatch.params)) {
          logger.info(`Match found: ${config.name} (${config.id})`);
          return { config, params: pathMatch.params };
        }
      }
    }

    return null;
  }

  // Verificar si el path coincide y extraer parámetros
  matchPath(configPath, requestPath) {
    const configParts = configPath.split('/');
    const requestParts = requestPath.split('/');
    
    if (configParts.length !== requestParts.length) {
      return null;
    }
    
    const params = {};
    
    for (let i = 0; i < configParts.length; i++) {
      if (configParts[i].startsWith(':')) {
        const paramName = configParts[i].substring(1);
        params[paramName] = requestParts[i];
      } else if (configParts[i] !== requestParts[i]) {
        return null;
      }
    }
    
    return { params };
  }

  // Verificar si las reglas coinciden
  rulesMatch(rules, request, pathParams) {
    // Verificar query params
    if (rules.query && Object.keys(rules.query).length > 0) {
      for (const [key, value] of Object.entries(rules.query)) {
        if (request.query[key] !== String(value)) {
          return false;
        }
      }
    }

    // Verificar headers
    if (rules.headers && Object.keys(rules.headers).length > 0) {
      for (const [key, value] of Object.entries(rules.headers)) {
        if (request.headers[key.toLowerCase()] !== value) {
          return false;
        }
      }
    }

    // Verificar body
    if (rules.body && Object.keys(rules.body).length > 0) {
      for (const [key, value] of Object.entries(rules.body)) {
        if (JSON.stringify(request.body[key]) !== JSON.stringify(value)) {
          return false;
        }
      }
    }

    // Verificar params
    if (rules.params && Object.keys(rules.params).length > 0) {
      for (const [key, value] of Object.entries(rules.params)) {
        if (pathParams[key] !== String(value)) {
          return false;
        }
      }
    }

    return true;
  }

  // Procesar respuesta dinámica
  async processResponse(config, request, params) {
    const response = JSON.parse(JSON.stringify(config.response));
    
    // Aplicar delay si está configurado
    if (response.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, response.delay));
    }
    
    // Reemplazar variables dinámicas
    if (typeof response.body === 'object') {
      response.body = this.replaceDynamicValues(response.body, { ...request, params });
    }

    return response;
  }

  // Reemplazar valores dinámicos
  replaceDynamicValues(obj, context) {
    if (typeof obj === 'string') {
      return this.replaceVariables(obj, context);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.replaceDynamicValues(item, context));
    }
    
    if (typeof obj === 'object' && obj !== null) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.replaceDynamicValues(value, context);
      }
      return result;
    }
    
    return obj;
  }

  // Reemplazar variables en strings
  replaceVariables(str, context) {
    return str.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
      const value = this.resolveVariable(variable.trim(), context);
      return value !== undefined ? value : match;
    });
  }

  // Resolver variables
  resolveVariable(path, context) {
    const parts = path.split('.');
    let value = context;
    
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    
    return value;
  }
}

module.exports = new MockService();
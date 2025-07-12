class MockConfig {
  constructor(data) {
    // Usar el ID proporcionado o generar uno simple basado en timestamp
    this.id = data.id || `MOCK-${Date.now()}`;
    this.name = data.name;
    this.description = data.description || '';
    this.path = data.path;
    this.method = data.method.toUpperCase();
    this.response = {
      status: data.response?.status || 200,
      headers: data.response?.headers || { 'Content-Type': 'application/json' },
      body: data.response?.body || {},
      delay: data.response?.delay || 0
    };
    this.rules = {
      query: data.rules?.query || {},
      headers: data.rules?.headers || {},
      body: data.rules?.body || {},
      params: data.rules?.params || {}
    };
    this.priority = data.priority || 0;
    this.enabled = data.enabled !== false;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      path: this.path,
      method: this.method,
      response: this.response,
      rules: this.rules,
      priority: this.priority,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = MockConfig;
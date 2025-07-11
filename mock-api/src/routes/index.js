const express = require('express');
const configRoutes = require('./configRoutes');
const mockRoutes = require('./mockRoutes');

const router = express.Router();

// API info
router.get('/', (req, res) => {
  res.json({
    name: 'Mock API Service',
    version: '1.0.0',
    endpoints: {
      configs: '/api/configs',
      documentation: '/api-docs',
      health: '/health'
    }
  });
});

// Rutas de configuración
router.use('/api/configs', configRoutes);

// Rutas de mock (debe ir al final para capturar todo)
router.use('/', mockRoutes);

module.exports = router;
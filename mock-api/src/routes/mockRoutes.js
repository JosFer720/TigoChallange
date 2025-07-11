const express = require('express');
const mockController = require('../controllers/mockController');

const router = express.Router();

// Capturar todas las rutas no manejadas para procesarlas como mocks
router.all('*', mockController.handleMockRequest);

module.exports = router;
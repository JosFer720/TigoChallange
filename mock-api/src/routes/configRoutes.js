const express = require('express');
const configController = require('../controllers/configController');
const { validateConfig, validateUpdateConfig } = require('../validators/configValidator');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MockConfig:
 *       type: object
 *       required:
 *         - name
 *         - path
 *         - method
 *         - response
 *       properties:
 *         id:
 *           type: string
 *           description: UUID único de la configuración
 *         name:
 *           type: string
 *           description: Nombre descriptivo del mock
 *         description:
 *           type: string
 *           description: Descripción detallada del mock
 *         path:
 *           type: string
 *           description: Ruta del endpoint (soporta parámetros como /users/:id)
 *         method:
 *           type: string
 *           enum: [GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS]
 *         response:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 200
 *             headers:
 *               type: object
 *             body:
 *               type: object
 *             delay:
 *               type: number
 *               description: Delay en milisegundos antes de responder
 *         rules:
 *           type: object
 *           properties:
 *             query:
 *               type: object
 *             headers:
 *               type: object
 *             body:
 *               type: object
 *             params:
 *               type: object
 *         priority:
 *           type: number
 *           description: Prioridad de la configuración (mayor = más prioritario)
 *         enabled:
 *           type: boolean
 *           default: true
 */

/**
 * @swagger
 * /api/configs:
 *   post:
 *     summary: Crear nueva configuración de mock
 *     tags: [Configurations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MockConfig'
 *     responses:
 *       201:
 *         description: Configuración creada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', validateConfig, configController.create);

/**
 * @swagger
 * /api/configs:
 *   get:
 *     summary: Obtener todas las configuraciones
 *     tags: [Configurations]
 *     parameters:
 *       - in: query
 *         name: enabled
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado habilitado/deshabilitado
 *       - in: query
 *         name: method
 *         schema:
 *           type: string
 *         description: Filtrar por método HTTP
 *       - in: query
 *         name: path
 *         schema:
 *           type: string
 *         description: Filtrar por path (búsqueda parcial)
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 */
router.get('/', configController.getAll);

/**
 * @swagger
 * /api/configs/{id}:
 *   get:
 *     summary: Obtener configuración por ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración encontrada
 *       404:
 *         description: Configuración no encontrada
 */
router.get('/:id', configController.getById);

/**
 * @swagger
 * /api/configs/{id}:
 *   put:
 *     summary: Actualizar configuración
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MockConfig'
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *       404:
 *         description: Configuración no encontrada
 */
router.put('/:id', validateUpdateConfig, configController.update);

/**
 * @swagger
 * /api/configs/{id}:
 *   delete:
 *     summary: Eliminar configuración
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuración eliminada
 *       404:
 *         description: Configuración no encontrada
 */
router.delete('/:id', configController.delete);

module.exports = router;
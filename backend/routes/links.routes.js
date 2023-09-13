const express = require('express')

// const { checkToken } = require('../controllers/users.controller');
const { validateToken } = require('../middlewares/auth.middleware')

const { validateLinksErrors } = require('../middlewares/validations.middlewares')
const { body, param } = require('express-validator')
const { Link } = require('../models/link.model')

// Controladores
const {
  getAllLinks,
  createLink,
  getLinkById,
  updateLink,
  deleteLink
} = require('../controllers/links.controller')

const router = express.Router()

// router.use(checkToken);
router.use(validateToken)

router.get('/', getAllLinks)
router.post('/',
  [
  // body('profile').notEmpty().withMessage('El ID del perfil es obligatorio').isMongoId().withMessage('El ID del perfil debe ser un ObjectId válido'),
    body('icon').notEmpty().withMessage('El icono es obligatorio'),
    body('status').notEmpty().withMessage('El estado es obligatorio').isBoolean().withMessage('El estado debe ser un booleano válido'),
    body('order').notEmpty().withMessage('El número de orden es obligatorio').isInt().withMessage('El número de orden debe ser un número entero válido'),
    body('name')
      .notEmpty().withMessage('El nombre es obligatorio'),
    /* .custom(async (value) => {
        const existingLink = await Link.findOne({ name: value });
        if (existingLink) {
          throw new Error('El nombre ya existe en la base de datos');
        }
      }), */
    body('urlEnlace')
      .notEmpty().withMessage('El URL es obligatorio').isURL().withMessage('El URL debe ser una URL válida'), /* .custom(async (value) => {
        const existingLink = await Link.findOne({ urlEnlace: value });
        if (existingLink) {
          throw new Error('El URL ya existe en la base de datos');
        }
      }) */
    validateLinksErrors
  ],
  createLink)

router
  .route('/:id')
  .get(getLinkById)
  .patch(
    [
      body('name').notEmpty().withMessage('El nombre es obligatorio'),
      body('urlEnlace').notEmpty().withMessage('El URL es obligatorio').isURL().withMessage('El URL debe ser una URL válida'),
      body('icon').notEmpty().withMessage('El icono es obligatorio'),
      body('status').notEmpty().withMessage('El estado es obligatorio').isBoolean().withMessage('El estado debe ser un booleano válido'),
      body('order').notEmpty().withMessage('El número de orden es obligatorio').isInt().withMessage('El número de orden debe ser un número entero válido'),
      validateLinksErrors
    ], updateLink)
  .delete(deleteLink)

module.exports = { linksRouter: router }

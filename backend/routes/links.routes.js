const express = require('express');
const { checkToken } = require('../controllers/users.controller');


// Controladores
const {
  getAllLinks,
  createLink,
  getLinkById,
  updateLink,
  deleteLink,
} = require('../controllers/links.controller');

const router = express.Router();

// router.use(checkToken);
router.get('/', getAllLinks);
router.post('/', createLink);

router
  .route('/:id')
  .get(getLinkById)
  .patch(updateLink)
  .delete(deleteLink);

module.exports = { linksRouter: router };

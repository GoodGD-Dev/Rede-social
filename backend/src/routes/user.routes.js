const express = require('express');
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Proteger todas as rotas
router.use(protect);

router.get('/search', userController.searchUsers);
router.get('/contacts', userController.getContacts);
router.post('/contacts/:userId', userController.addContact);
router.delete('/contacts/:userId', userController.removeContact);

module.exports = router;
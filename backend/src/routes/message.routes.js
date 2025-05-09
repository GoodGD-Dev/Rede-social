const express = require('express');
const messageController = require('../controllers/message.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Proteger todas as rotas
router.use(protect);

router.post('/', messageController.sendMessage);
router.get('/user/:userId', messageController.getMessages);
router.get('/unread-count', messageController.getUnreadCount);

module.exports = router;
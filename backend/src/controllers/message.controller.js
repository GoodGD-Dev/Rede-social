const Message = require('../models/message.model');
const User = require('../models/user.model');

/**
 * Enviar mensagem para um usuário
 */
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    // Verificar se o destinatário existe
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Destinatário não encontrado.'
      });
    }

    // Criar nova mensagem
    const newMessage = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      content
    });

    // Obter mensagem com detalhes do remetente
    const message = await Message.findById(newMessage._id)
      .populate('sender', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: {
        message
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Obter mensagens entre o usuário logado e outro usuário
 */
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado.'
      });
    }

    // Buscar mensagens entre os dois usuários
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
      ]
    })
      .sort('createdAt')
      .populate('sender', 'username profilePicture');

    // Marcar mensagens recebidas como lidas
    await Message.updateMany(
      { sender: userId, recipient: req.user._id, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      results: messages.length,
      data: {
        messages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Obter contagem de mensagens não lidas
 */
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      recipient: req.user._id,
      read: false
    });

    res.status(200).json({
      success: true,
      data: {
        unreadCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

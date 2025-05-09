const User = require('../models/user.model');

/**
 * Buscar usuários por nome (para adicionar contatos)
 */
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça um termo para busca.'
      });
    }

    // Buscar usuários com username parecido, excluindo o próprio usuário
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.user._id }
    }).select('username profilePicture bio');

    res.status(200).json({
      success: true,
      results: users.length,
      data: {
        users
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
 * Adicionar usuário à lista de contatos
 */
exports.addContact = async (req, res) => {
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

    // Verificar se o usuário já está na lista de contatos
    if (req.user.contacts.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Este usuário já está na sua lista de contatos.'
      });
    }

    // Adicionar usuário à lista de contatos
    await User.findByIdAndUpdate(req.user._id, {
      $push: { contacts: userId }
    });

    res.status(200).json({
      success: true,
      message: 'Contato adicionado com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Remover usuário da lista de contatos
 */
exports.removeContact = async (req, res) => {
  try {
    const { userId } = req.params;

    // Remover usuário da lista de contatos
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { contacts: userId }
    });

    res.status(200).json({
      success: true,
      message: 'Contato removido com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Listar contatos do usuário
 */
exports.getContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('contacts', 'username profilePicture bio');

    res.status(200).json({
      success: true,
      results: user.contacts.length,
      data: {
        contacts: user.contacts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

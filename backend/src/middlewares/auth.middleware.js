const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar se o token está nos cookies
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // Verificar se o token está no header Authorization
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Você não está autenticado. Por favor, faça login.'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar se o usuário ainda existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'O usuário desta token não existe mais.'
      });
    }

    // Adicionar usuário ao request
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido. Por favor, faça login novamente.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Sua sessão expirou. Por favor, faça login novamente.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Não autorizado. Por favor, faça login novamente.'
    });
  }
};
const User = require('../models/user.model');
const { signTokenAndSetCookie } = require('../config/jwt.config');

/**
 * Registro de novo usuário
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar se o email já existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email
          ? 'Este email já está em uso.'
          : 'Este username já está em uso.'
      });
    }

    // Criar novo usuário
    const newUser = await User.create({
      username,
      email,
      password
    });

    // Remover o password do objeto de resposta
    newUser.password = undefined;

    // Gerar token e enviar resposta
    const token = signTokenAndSetCookie(newUser, res);

    res.status(201).json({
      success: true,
      token,
      data: {
        user: newUser
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
 * Login de usuário
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça email e senha.'
      });
    }

    // Buscar usuário e incluir a senha para verificação
    const user = await User.findOne({ email }).select('+password');

    // Verificar se o usuário existe e a senha está correta
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos.'
      });
    }

    // Remover senha do objeto de resposta
    user.password = undefined;

    // Gerar token e enviar resposta
    const token = signTokenAndSetCookie(user, res);

    res.status(200).json({
      success: true,
      token,
      data: {
        user
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
 * Logout do usuário
 */
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // 10 segundos
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
};

/**
 * Obter dados do usuário logado
 */
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
};
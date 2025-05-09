const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT e configura o cookie
 * @param {Object} user - Objeto do usuário
 * @param {Object} res - Resposta Express
 */
exports.signTokenAndSetCookie = (user, res) => {
  // Gerar token com o ID do usuário
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Calcular expiração para o cookie
  const cookieExpiration = process.env.JWT_EXPIRES_IN.endsWith('d')
    ? parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
    : 7 * 24 * 60 * 60 * 1000; // 7 dias padrão

  // Configurar cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + cookieExpiration),
    httpOnly: true, // Não acessível via JavaScript
    secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
    sameSite: 'strict' // Proteção contra CSRF
  });

  return token;
};
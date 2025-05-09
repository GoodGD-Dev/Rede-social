* Validar email
  * @param { String } email - Email a ser validado
    * @returns { Boolean } Se o email é válido
      */
export function isValidEmail(email) {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar senha
 * @param {String} password - Senha a ser validada
 * @returns {Boolean} Se a senha é válida
 */
export function isValidPassword(password) {
  if (!password) return false;

  return password.length >= 6;
}

/**
 * Validar nome de usuário
 * @param {String} username - Nome de usuário a ser validado
 * @returns {Boolean} Se o nome de usuário é válido
 */
export function isValidUsername(username) {
  if (!username) return false;

  return username.length >= 3 && username.length <= 20;
}
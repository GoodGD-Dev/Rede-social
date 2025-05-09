* Formatar data para exibição
  * @param { String | Date } date - Data a ser formatada
    * @param { Boolean } includeTime - Se deve incluir o horário
      * @returns { String } Data formatada
        */
export function formatDate(date, includeTime = false) {
  if (!date) return '';

  const dateObj = new Date(date);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return dateObj.toLocaleDateString('pt-BR', options);
}

/**
 * Formatar horário para exibição
 * @param {String|Date} date - Data a ser formatada
 * @returns {String} Horário formatado
 */
export function formatTime(date) {
  if (!date) return '';

  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Verificar se a data é hoje
 * @param {String|Date} date - Data a ser verificada
 * @returns {Boolean} Se a data é hoje
 */
export function isToday(date) {
  if (!date) return false;

  const dateObj = new Date(date);
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Verificar se a data é ontem
 * @param {String|Date} date - Data a ser verificada
 * @returns {Boolean} Se a data é ontem
 */
export function isYesterday(date) {
  if (!date) return false;

  const dateObj = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}
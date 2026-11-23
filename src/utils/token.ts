// Функция проверки наличия токена
export function isTokenExists(): boolean {
  return !!localStorage.getItem('accessToken');
}

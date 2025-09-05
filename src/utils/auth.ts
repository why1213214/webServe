const TOKEN_KEY = 'APP_TOKEN';
const NAME_KEY = 'APP_USER_NAME';

export function saveAuth(token: string, name: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME_KEY, name);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

export function loadAuth() {
  return {
    token: localStorage.getItem(TOKEN_KEY),
    name: localStorage.getItem(NAME_KEY) || ''
  };
}

export function isAuthed() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export default {
  saveAuth,
  clearAuth,
  loadAuth,
  isAuthed
};

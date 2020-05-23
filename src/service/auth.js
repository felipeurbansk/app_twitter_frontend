export const isAuthenticated = () => localStorage.getItem('TOKEN_KEY') !== null;
export const getToken = () => localStorage.getItem('TOKEN_KEY');
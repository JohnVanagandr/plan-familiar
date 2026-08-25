export const authService = {
  login: async (credentials) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (credentials.email === "error@correo.com") {
      throw new Error("Credenciales inválidas.");
    }
    
    return { token: "mock-jwt-token-123", user: { name: "Usuario Institucional", email: credentials.email } };
  },

  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "Usuario registrado con éxito", user: userData };
  },

  recoverPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "Instrucciones enviadas a " + email };
  }
};
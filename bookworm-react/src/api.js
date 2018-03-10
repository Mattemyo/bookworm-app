import axios from 'axios';

export default {
  user: {
    login: (credentials: {}): {} =>
      axios
        .post('http://localhost:8080/api/auth', { credentials })
        .then((res: {}): {} => res.data.user),
    signup: (user: {}): {} =>
      axios.post('/api/users', { user }).then((res: {}): {} => res.data.user),
    confirm: (token: string): {} =>
      axios
        .post('/api/auth/confirmation', { token })
        .then((res: {}): {} => res.data.user),
    resetPasswordRequest: (email: string): void =>
      axios.post('/api/auth/reset_password', { email }),
    validateToken: (token: string): any =>
      axios.post('/api/auth/validate_token', { token }),
    resetPassword: (data: {}): any =>
      axios.post('/api/auth/reset_password', { data })
  }
};

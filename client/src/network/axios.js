import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const SignUp = async (email, password, name) => {
  const result = await instance.post('/signup', {
    headers: {
      ...instance.headers,
    },
    data: {
      email,
      password,
      name,
    },
  });
  return result;
};

export const login = async (email, password) => {
  const result = await instance.post('/login', {
    data: {
      email,
      password,
    },
  });
  console.log(result);
  return result;
};

export const logout = () => {};
// todo error check

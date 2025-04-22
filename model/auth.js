import { db } from '../db/database.js';

export async function findByEmail(email) {
  return db
    .execute('SELECT * FROM users WHERE email=?', [email])
    .then((result) => {
      return result[0][0];
    });
}

export async function createUser(user) {
  const { email, password, name } = user;
  return db
    .execute('INSERT INTO users (email, password, name) VALUES (?,?,?)', [
      email,
      password,
      name,
    ])
    .then((result) => console.log('result :', result));
}

// import { db } from '../db/database.js';

export async function findByEmail(email) {
  return db
    .execute('SELECT * FROM users WHERE email=?', [email])
    .then(console.log);
}

export async function createUser(user) {
  const { email, password, name } = user;
  return db
    .execute('INSERT INTO users (email, password, name) VALUES (?,?,?)', [
      email,
      password,
      name,
    ])
    .then(console.log);
}

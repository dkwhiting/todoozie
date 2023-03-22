const { client } = require('./client');
const {
  createUser
} = require('./users')

const dropTables = async () => {
  try {
    console.log('Dropping tables')
    await client.query(`
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS users;
    `)
    console.log('Finished dropping tables')
  } catch (error) {
    console.error('Error dropping tables', error)
  }
}

const createTables = async () => {
  try {
    console.log('Building tables')
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      due_date TIMESTAMP,
      project_id INT NOT NULL,
      user_id INT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'todo',
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `)

    console.log('Finished building tables')
  } catch (error) {
    console.error('Error building tables', error)
  }
}

const createInitialUsers = async () => {
  try {
    console.log('Creating initial users')
    await createUser({ email: 'jobin@fake.com', password: 'password' })
    console.log('Finished creating initial users')
  } catch (error) {
    console.error('Error creating initial users', error)
  }
}

(async () => {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    console.log("Database has been rebuilt");
    await client.end()
    console.log('Pool ended')
  }
})();
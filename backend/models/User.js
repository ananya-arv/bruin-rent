// temp in-memory user storage (will be replaced with MongoDB later)
const users = [];

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // will be hashed
    this.createdAt = new Date();
  }

  // finding user by email
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  // finding user by ID
  static findById(id) {
    return users.find(user => user.id === id);
  }

  // creating new user
  static create(userData) {
    const newUser = new User(
      users.length + 1,
      userData.name,
      userData.email,
      userData.password
    );
    users.push(newUser);
    return newUser;
  }

  // get all users (for testing)
  static getAll() {
    return users;
  }
}

module.exports = User;
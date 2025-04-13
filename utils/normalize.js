function normalizePath(path) {
    return path
      .replace(/:([a-zA-Z_]+)/g, '{$1}') // /users/:id → /users/{id}
      .replace(/\/+$/, '')               // remove trailing slashes
      .toLowerCase();                    // compara tudo em lowercase
  }
  
  module.exports = { normalizePath };
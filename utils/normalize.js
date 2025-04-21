function normalizePath(path) {
  // Substitui números ou identificadores por um placeholder (ex: /users/123 → /users/{id})
  return path
    .replace(/\/\d+/g, '/{id}')                 // números
    .replace(/\/[a-f0-9-]{24}/gi, '/{id}')       // IDs tipo MongoDB
    .replace(/\/[^/]+(?=\/?$)/g, '/{id}');       // fallback para qualquer segmento final
}

module.exports = { normalizePath };
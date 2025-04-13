const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseOpenApi(filePath) {
  const ext = path.extname(filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  let spec;

  if (ext === '.yaml' || ext === '.yml') {
    spec = yaml.load(raw);
  } else if (ext === '.json') {
    spec = JSON.parse(raw);
  } else {
    throw new Error('Format not supported. Use .yaml, .yml or .json');
  }

  const endpoints = [];

  for (const [route, methods] of Object.entries(spec.paths)) {
    for (const method of Object.keys(methods)) {
      endpoints.push({
        method: method.toUpperCase(),
        path: route
      });
    }
  }

  return endpoints;
}

module.exports = { parseOpenApi };
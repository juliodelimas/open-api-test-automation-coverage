const { normalizePath } = require('../utils/normalize');

function compare(specEndpoints, testedEndpoints) {
  const testedSet = new Set(
    testedEndpoints.map(e => `${e.method} ${normalizePath(e.path)} ${e.statusCode}`)
  );

  const covered = [];
  const uncovered = [];

  for (const endpoint of specEndpoints) {
    const key = `${endpoint.method} ${normalizePath(endpoint.path)} ${endpoint.statusCode}`;
    if (testedSet.has(key)) {
      covered.push(endpoint);
    } else {
      uncovered.push(endpoint);
    }
  }

  return { covered, uncovered };
}

module.exports = { compare };
const { parseOpenApi } = require('./parser/openapiParser');
const { parseTests } = require('./parser/supertestParser');
const { compare } = require('./compare/compareCoverage');

(async () => {
  const spec = await parseOpenApi('./examples/openapi.yaml');
  const tested = await parseTests('./examples');

  const { covered, uncovered } = compare(spec, tested);

  console.log('\n✅ Endpoints cobertos:');
  covered.forEach(e => console.log(`- [${e.method}] ${e.path}`));

  console.log('\n❌ Endpoints NÃO cobertos:');
  uncovered.forEach(e => console.log(`- [${e.method}] ${e.path}`));
})();
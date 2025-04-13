#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { parseOpenApi } = require('../parser/openapiParser');
const { parseTests } = require('../parser/supertestParser');
const { compare } = require('../compare/compareCoverage');

program
  .requiredOption('-s, --spec <path>', 'Path to the OpenAPI spec (yaml ou json)')
  .requiredOption('-t, --tests <path>', 'Test files folder')
  .option('-x, --suffix <suffix>', 'Test filename sulfix (Default is .test.js)', '.test.js');

program.parse();

(async () => {
  const { spec, tests, suffix } = program.opts();

  const specEndpoints = await parseOpenApi(path.resolve(spec));
  const testedEndpoints = await parseTests(path.resolve(tests), suffix);

  const { covered, uncovered } = compare(specEndpoints, testedEndpoints);

  console.log('\nCovered endpoints:');
  covered.forEach(e => console.log(`- [${e.method}] ${e.path}`));

  console.log('\nUncovered endpoints:');
  uncovered.forEach(e => console.log(`- [${e.method}] ${e.path}`));

  console.log(`\n📊 Coverage: ${covered.length} of ${covered.length + uncovered.length} endpoint(s)`);
})();
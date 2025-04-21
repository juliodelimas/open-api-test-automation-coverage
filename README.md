[![npm version](https://img.shields.io/npm/v/open-api-test-automation-coverage)](https://www.npmjs.com/package/open-api-test-automation-coverage)

# OpenAPI Test Automation Coverage

A simple CLI to check how much of your API defined by OpenAPI is being covered by integration tests based on SuperTest — now also tracking **status code coverage**.

## Why use it?

- Discover which endpoints are already covered by tests
- Identify which **expected status codes** are not yet verified
- Automatically analyzes your OpenAPI spec and your test files
- Supports nested folders and custom file suffixes
- Ideal for Node.js projects using SuperTest

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/juliodelimas/open-api-test-automation-coverage.git
cd open-api-test-automation-coverage
npm install
```

You can also run it directly with `npx`:

```bash
npx ./bin/open-api-test-automation-coverage.js --spec ./spec/openapi.yaml --tests ./tests
```

Or install it globally:

```bash
npm install -g open-api-test-automation-coverage
```

Then run it from anywhere:

```bash
open-api-test-automation-coverage --spec ./spec/openapi.yaml --tests ./tests
```

## Usage

```bash
open-api-test-automation-coverage   --spec ./examples/openapi.yaml   --tests ./examples   --suffix .test.js
```

### Required arguments

- `--spec` or `-s`: Path to your OpenAPI file (`.yaml` or `.json`)
- `--tests` or `-t`: Directory containing your SuperTest files

### Optional arguments

- `--suffix` or `-x`: Test file suffix (default: `.test.js`)

## Output

```text
Covered endpoints (method path status):
- [GET] /users → 200
- [GET] /users → 400
- [POST] /login → 200

Uncovered endpoints (missing status codes):
- [POST] /users → 201
- [POST] /users → 400
- [GET] /users/{id} → 200
- [GET] /users/{id} → 404
- [PUT] /users/{id} → 200
- [PUT] /users/{id} → 400
- [PUT] /users/{id} → 404
- [DELETE] /users/{id} → 204
- [DELETE] /users/{id} → 404
- [POST] /login → 401

📊 Status Code Coverage: 3 of 13 endpoint+status combinations
```

## How it works

1. Parses the OpenAPI spec and extracts all method/path/status combinations
2. Scans the test files and extracts all SuperTest calls (`.get()`, `.post()`, etc.)
3. Normalizes paths like `/users/:id` to `/users/{id}` to match OpenAPI spec
4. Compares defined combinations with those found in the tests
5. Outputs a clear report of what’s covered and what’s missing

## Stack

- Node.js
- [`commander`](https://www.npmjs.com/package/commander) for CLI parsing
- [`js-yaml`](https://www.npmjs.com/package/js-yaml) for reading `.yaml` files
- Regex parser for SuperTest pattern extraction

## Supported Test Example

```js
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  it('GET /users should return all users', async () => {
    await request(app).get('/users').expect(200);
  });

  it('POST /login should authenticate user', async () => {
    await request(app).post('/login').send({ username: 'test', password: 'test' }).expect(200);
  });
});
```

## OpenAPI Example

```yaml
paths:
  /users:
    get:
      responses:
        '200': { description: OK }
        '400': { description: Bad Request }
    post:
      responses:
        '201': { description: Created }
        '400': { description: Bad Request }
  /users/{id}:
    get:
      responses:
        '200': { description: OK }
        '404': { description: Not Found }
```

## Future improvements

- Export report as JSON or Markdown
- Generate a coverage badge for CI
- HTML report
- GitHub Actions integration
- Highlight spec paths or methods with format issues

## Contributions

PRs are very welcome! Open an issue to suggest improvements or report bugs.

---

MIT License
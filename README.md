# OpenAPI Test Automation Coverage

A simple CLI tool to check how much of your OpenAPI-defined API is covered by your SuperTest-based integration tests.

## Why use this?

- See which endpoints are already covered by tests
- Identify which endpoints are still untested
- Automatically parse both your OpenAPI spec and your test files
- Works with nested folders and custom test file suffixes

## Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/juliodelimas/open-api-test-automation-coverage.git
cd open-api-test-automation-coverage
npm install
```

You can run it directly using `npx`:

```bash
npx ./bin/open-api-test-automation-coverage.js --spec ./path/to/openapi.yaml --tests ./path/to/tests
```

Or install it globally (optional):

```bash
npm install -g .
```

Then use it anywhere as:

```bash
open-api-test-automation-coverage --spec ./spec/openapi.yaml --tests ./tests
```

## Example usage

```bash
open-api-test-automation-coverage \
  --spec ./examples/openapi.yaml \
  --tests ./examples \
  --suffix .test.js
```

### Required Arguments

- `--spec` or `-s`: Path to your OpenAPI spec file (`.yaml` or `.json`)
- `--tests` or `-t`: Directory where your SuperTest files live

### Optional Arguments

- `--suffix` or `-x`: File suffix used for test files (default: `.test.js`)

## Output

```
Endpoints covered:
- [get] /users
- [get] /users/{id}
- [post] /login

Endpoints NOT covered:
- [delete] /users/{id}
- [put] /users/{id}

Coverage: 3 of 5 endpoint(s)
```

## How it works

1. Parses the OpenAPI spec and collects all endpoint/method combinations.
2. Recursively scans test files and extracts all SuperTest `.get()`, `.post()`, etc. calls.
3. Normalizes paths like `/users/:id` into `/users/{id}` to match OpenAPI format.
4. Compares the sets and shows you what's covered vs. what's missing.

## Tech stack

- Node.js
- `commander` for CLI argument parsing
- `js-yaml` for OpenAPI YAML parsing
- Custom parser for SuperTest patterns

## Test File Format Supported

Your test files must use SuperTest and follow a general format like:

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

## OpenAPI Format

Your OpenAPI spec should follow standard `paths` structure:

```yaml
paths:
  /users:
    get:
      summary: Get all users
  /users/{id}:
    get:
      summary: Get user by ID
    delete:
      summary: Delete a user
```

## Roadmap / Ideas

- Export report as JSON or Markdown
- Generate badge for CI pipelines
- Add HTML report (optional)
- CI integration with GitHub Actions
- Highlight mismatched paths or methods

## Contributing

Pull requests are welcome! Feel free to open an issue if you want to suggest something or report a bug.

---

MIT License

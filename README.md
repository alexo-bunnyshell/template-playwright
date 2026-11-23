# template-playwright

Playwright end-to-end tests that run **inside a Bunnyshell environment**, next to the
application they test.

On every environment deploy (and start), the suite runs against the freshly deployed
application. The results are published as an HTML report at the environment's own URL,
and failing tests fail the deploy. For preview environments created from pull requests,
that failure shows up on the PR.

## How it works

The Bunnyshell template in `.bunnyshell/templates/playwright` has three components:

| Component | Kind | What it does |
|---|---|---|
| `application` | Application | The app under test ([template-vue-tailwind](https://github.com/bunnyshell/template-vue-tailwind)). Replace with your own. |
| `playwright` | Application | Built from this repo. Holds the tests and serves the latest report at `https://playwright-<env domain>`. |
| `e2e-tests` | KubernetesManifest | Runs after the other two. Runs the suite inside the `playwright` pod with `kubectl exec` and passes on its exit code. |

The tests run inside the environment, so they can reach services that have no public
URL (`TEST_LOCAL_URL`), as well as the public ingress (`BASE_URL`).

Each run also writes `status.json` (pass/fail and counts) and `results.json` (the full
Playwright JSON report) next to the HTML report, so scripts and CI can read the outcome:

```sh
curl -s https://playwright-<env domain>/status.json
```

## Configuration

Environment variables in `bunnyshell.yaml`:

| Variable | Default | Meaning |
|---|---|---|
| `E2E_BLOCKING` | `true` | Fail the deploy when tests fail. Set to `false` to only publish the report. |
| `PW_BROWSERS` | `chromium` | Comma-separated browsers: `chromium`, `firefox`, `webkit`. |
| `PW_TRACE` / `PW_VIDEO` | `retain-on-failure` | Set to `on` to keep a trace or video for passing tests too (useful for demos). |

Variables read by the test container:

| Variable | Meaning |
|---|---|
| `BASE_URL` | URL used by `page.goto('/')`. |
| `TEST_LOCAL_URL` | In-cluster URL of the app (internal service tests are skipped without it). |
| `WAIT_FOR_URLS` | Comma-separated URLs that must answer before tests start (defaults to `BASE_URL`). |
| `WAIT_TIMEOUT` | Seconds to wait for them (default `300`). |
| `RUN_ON_START` | `true` runs the suite once when the container starts. Not needed with `e2e-tests`. |
| `REPORT_URL` | Printed at the end of a run. |

Failures keep a trace, a screenshot and a video. Failing tests are retried once, so the
report separates flaky tests from real failures.

## Use it with your own application

1. Replace the `application` component with your own components.
2. Replace `tests/app.spec.ts` with your tests.
3. Point `BASE_URL`, `TEST_LOCAL_URL` and `WAIT_FOR_URLS` at your services.
4. Point the `playwright` component's `gitRepo` at your copy of this repo.

## Run the tests elsewhere

The image runs the same way outside Bunnyshell, for example in CI against an
environment's public URL:

```sh
docker build -t e2e -f docker/Dockerfile .
docker run --rm -e BASE_URL=https://app.example.com e2e run   # exits with the test result
```

Or locally without Docker:

```sh
npm ci && npx playwright install --with-deps chromium
BASE_URL=http://localhost:3000 npm test
```

## Versions

Playwright 1.65.1, `mcr.microsoft.com/playwright:v1.65.1-noble` (Node.js 26). When upgrading,
change the version in `package.json` and the image tag in `docker/Dockerfile` together.

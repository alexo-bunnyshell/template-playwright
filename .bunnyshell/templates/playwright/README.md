# Template overview

This [Environment Template](https://documentation.bunnyshell.com/docs/templates-what-are-templates)
runs Playwright end-to-end tests inside a Bunnyshell environment, next to the application
they test.

On every deploy and start:

1. `application` (the app under test) and `playwright` (the test suite and report server) deploy.
2. `e2e-tests` waits for both, then runs the suite inside the `playwright` pod, where internal
   service addresses resolve.
3. The HTML report is published at `https://playwright-<env domain>`, with a trace, screenshot
   and video for each failure.
4. If any test fails, the deploy fails. Set `E2E_BLOCKING` to `false` to only publish the report.

For preview environments created from pull requests, a failed deploy is reported on the
pull request, so broken changes are visible before they merge.

# How to use this Template

Create an environment from this template, then replace the `application` component and the
tests in `tests/` with your own. See the
[repository README](https://github.com/alexo-bunnyshell/template-playwright) for configuration.

---
name: Playwright - Basic tests for an external service
description: "This sample demonstrates how to test an external service"
page_type: sample
languages:
- typescript
- javascript
products:
- playwright
urlFragment: boxed-steps
---

# Test external service

This sample demonstrates how to connect to and test an external service (a service running outside of this Playwright container ).

 
The tests will connect to URLS specified in these env vars:
- `TEST_SECURE_URL`: the HTTPS endpoint of the application to test, accessible from outside of the environment (through an ingress).
- `TEST_LOCAL_URL`: the HTTP endpoint of the application, only accessible from inside the environment.
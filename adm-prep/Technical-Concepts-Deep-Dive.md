# Technical Concepts Deep Dive — The Engineering Knowledge an ADM Needs

*A plain-English guide to every technical concept referenced in the Tactical Question Bank and company engagement scenarios. Designed so each section builds on the previous one — read straight through the first time, then use as a reference.*

---

## How to Use This Guide

Each concept follows the same structure:
- **What it is** — Plain English definition, no jargon assumed.
- **Why it matters for an ADM** — How this concept surfaces in customer conversations.
- **How to talk about it** — Interview-ready framing you can use.
- **Real-world example** — A concrete scenario to make it stick.

---

## Part 1: The Software Development Lifecycle (SDLC)

These are the stages every piece of software goes through. AI tools like Cursor touch every stage differently, and an ADM needs to know where AI helps, where it's risky, and where it doesn't apply.

### 1.1 Requirements → Design → Build → Test → Deploy → Operate

**What it is:** The six stages of building software, usually running in continuous cycles (not once in a straight line):

1. **Requirements** — What should the software do? (Product managers, stakeholders)
2. **Design** — How will we architect it? (System design, data models, API contracts)
3. **Build** — Writing the actual code. (Developers in their IDEs)
4. **Test** — Verifying the code works correctly. (Automated tests, QA, code review)
5. **Deploy** — Shipping the code to production where real users interact with it.
6. **Operate** — Monitoring, incident response, performance tuning, bug fixes.

**Why it matters for an ADM:** Cursor primarily accelerates Build and Test. But AI-generated code can create problems in Deploy (rollbacks) and Operate (performance, memory leaks, incidents). An ADM who only talks about Build is missing where the real pain shows up.

**How to talk about it:** "Cursor accelerates the build-and-test phases, but we also need to ensure the downstream stages — deployment and operations — have the right guardrails. That means performance testing, progressive rollouts, and observability. AI makes code faster to write; the rest of the pipeline needs to keep up."

### 1.2 Sprints and Agile

**What it is:** Most modern teams work in short cycles called **sprints** (typically 2 weeks). Each sprint has a goal, a set of tasks, and a deliverable. At the end, the team reviews what shipped and plans the next sprint. This iterative approach is called **Agile** (as opposed to "Waterfall," where all requirements are defined upfront and the whole project is built in sequence).

**Why it matters for an ADM:** You need to fit Cursor adoption into existing sprint rhythms. You wouldn't introduce a new tool mid-sprint on a critical deadline. The best time is at the start of a sprint, with a specific task designated for the pilot.

### 1.3 Pull Requests (PRs) and Code Review

**What it is:** When a developer finishes a feature, they don't push it directly to the main codebase. They create a **pull request** (PR) — a proposal that says "here's what I changed, please review it." Other developers review the code, leave comments, request changes, and eventually approve it. Only then does it merge into the main codebase.

**Why it matters for an ADM:** PRs are the quality gate between "code written" and "code shipped." When AI generates code, the PR review process is the primary human checkpoint. If reviewers rubber-stamp AI-generated PRs because they look clean, bugs slip through. A key ADM conversation: "Are your reviewers reviewing AI-generated code with the same rigor as human-written code?"

**Real-world example:** A team using Agent mode ships PRs 30% faster, but the rollback rate increases. Investigation reveals reviewers were approving faster because the AI-generated code *looked* professional — well-formatted, good variable names — but they weren't scrutinizing the logic as carefully.

---

## Part 2: Code Architecture and Patterns

### 2.1 Frontend, Backend, and Full-Stack

**What it is:**
- **Frontend** — The part users see and interact with (web pages, mobile app screens). Built with technologies like React, TypeScript, HTML/CSS.
- **Backend** — The server-side logic users don't see: databases, business logic, APIs, authentication. Built with languages like Go, Python, Java, Node.js.
- **Full-stack** — Developers who work on both.

**Why it matters for an ADM:** Different teams have different Cursor use cases. Frontend teams benefit from component generation, styling, and UI consistency. Backend teams care about API correctness, database query performance, and security. You position the tool differently depending on who you're talking to.

### 2.2 APIs (Application Programming Interfaces)

**What it is:** An API is a contract between two pieces of software. When your phone's weather app shows the forecast, it's calling a weather service's API — sending a structured request and getting a structured response. APIs define: what you can ask for, how to ask for it, and what you'll get back.

**Why it matters for an ADM:** API contract inconsistency (Q35 in the Tactical Bank) is a common AI-generation problem. When different developers use Agent mode to build different API endpoints independently, they can end up with different response formats — even though each endpoint works correctly in isolation. The fix is shared API specifications (OpenAPI/Swagger) referenced in Cursor Rules.

**How to talk about it:** "APIs are the contracts between services. When AI generates endpoints independently, those contracts can drift. We recommend an OpenAPI spec referenced in Rules so every generated endpoint follows the same format."

### 2.3 Databases and SQL

**What it is:** Databases store persistent data — user accounts, orders, transactions, content. **SQL** (Structured Query Language) is the language used to read and write data in relational databases (PostgreSQL, MySQL, SQL Server). A SQL query might look like: `SELECT * FROM orders WHERE status = 'pending'`.

**Key performance concepts:**

- **Indexes** — A database index is like a book's index: it lets the database find specific rows without scanning every row in the table. Without an index, a query on a 500-million-row table scans all 500 million rows (called a **full table scan**). With an index, it jumps directly to the matching rows.

- **The N+1 query problem** — Instead of fetching all related data in one query, the code fetches one parent record, then makes a separate query for each child record. If there are 1,000 children, that's 1,001 queries instead of 2. At small scale (10 records in a dev database), the difference is invisible. At production scale (millions of records), it causes severe slowdowns.

- **Table locks** — Some database operations (especially large updates or unindexed queries) can "lock" a table, preventing other operations from running until the lock is released. In production, this can cause all requests to queue up and time out.

**Why it matters for an ADM:** AI-generated SQL is the scenario in Q38. The code works perfectly in dev (small data) but fails catastrophically in production (large data). An ADM should understand *why* this happens and be able to recommend: "Add database-specific Rules, require EXPLAIN ANALYZE before committing queries, and test against production-scale data."

**Real-world example:** An AI-generated query joins two tables of 500 million rows each without a WHERE clause filter. In dev (1,000 rows), it runs in 5ms. In production, it tries to process 250 trillion row combinations, consuming all database memory and locking the table for 20 minutes.

### 2.4 Microservices vs. Monoliths

**What it is:**
- **Monolith** — The entire application is one codebase, deployed as one unit. Simpler to start; harder to scale independently.
- **Microservices** — The application is split into many small, independent services (user service, payment service, notification service), each with its own codebase and deployment. More complex to manage, but teams can deploy independently.

**Why it matters for an ADM:** In microservices environments, architectural drift (Q31) is a bigger risk because each service can evolve independently. If two teams use Agent mode on different services, they might adopt different patterns for error handling, logging, or API responses. Governance via shared Rules and templates matters more in microservices architectures.

### 2.5 Architectural Drift

**What it is:** Over time, different parts of a codebase start using different patterns to solve the same problem. One service handles errors with try/catch blocks; another uses result types; a third uses middleware. Each approach works, but the inconsistency makes the codebase harder to understand, maintain, and onboard new developers into.

**Why AI accelerates this:** Agent mode solves each task in isolation. Without explicit instructions pointing to canonical patterns, it draws from its training data — which contains thousands of valid approaches. Different developers providing different context to the AI will get different (but individually correct) implementations.

**The fix:** Pattern-specific Rules that point to template files ("When creating a new API endpoint, follow exactly the pattern in `services/_template/endpoint.go`"), shared golden templates, and periodic architecture consistency reviews.

### 2.6 Middleware and Execution Order

**What it is:** In web applications, **middleware** is code that runs in a chain before a request reaches its main handler. Each middleware does one thing: rate limiting, authentication, authorization, logging, etc. The **order** of this chain matters. If rate limiting runs *before* authentication, unauthenticated requests are rate-limited (protecting your system from floods of bad requests). If rate limiting runs *after* authentication, an attacker can flood your auth system before rate limiting kicks in.

**Why it matters for an ADM:** This is Q32. AI refactoring might restructure middleware code for "cleanliness" and inadvertently reorder the chain. The code still compiles, tests still pass (they test each middleware in isolation), but the security posture changes. The fix: explicit Rules documenting middleware order, integration tests validating the sequence, and AI-restricted zones for security-critical code.

---

## Part 3: Testing Layers

Testing is where AI tools create the most subtle problems. Understanding the *layers* of testing is critical for an ADM.

### 3.1 Unit Tests

**What it is:** Tests that verify a single function or method in isolation. They're fast (milliseconds each), deterministic, and mock all external dependencies. If a function adds two numbers, the unit test verifies that `add(2, 3)` returns `5`.

**Why it matters:** AI is excellent at generating unit tests — but tends to generate *too many* (Q33) and make them *too shallow* (Q30). A unit test that verifies `add(2, 3) == 5` doesn't tell you what happens when the function receives `null`, `Infinity`, or a string.

### 3.2 Integration Tests

**What it is:** Tests that verify how multiple components work *together*. Instead of testing the "add" function alone, an integration test verifies that when a user submits a form, the API receives the data, validates it, stores it in the database, and returns the correct response.

**Why it matters:** Integration tests catch the bugs that live in the *seams* between components — exactly where unit tests don't reach. AI tools are significantly less reliable at generating integration tests because they require understanding how the full system connects.

### 3.3 End-to-End (E2E) Tests

**What it is:** Tests that simulate a real user interacting with the application from start to finish. A browser automation tool clicks buttons, fills forms, navigates pages, and verifies the results — as if a human were using the product.

**Why it matters:** E2E tests catch the most realistic bugs but are slow, expensive, and fragile. They should be the top of the testing pyramid — few in number but covering critical user journeys. AI tools rarely generate good E2E tests because they require understanding user workflows, not just code behavior.

### 3.4 Contract Tests

**What it is:** Tests that verify the *agreement* (contract) between two services. If Service A expects Service B's API to return `{ user: { id: 123, name: "Alice" } }`, a contract test verifies that Service B actually returns that exact shape — and that Service A can handle it correctly.

**Why it matters for an ADM:** When AI generates API endpoints independently (Q35), response shapes can drift. Contract tests catch this drift automatically, before it reaches production. Recommend them for any team with multiple services communicating via APIs.

**How to talk about it:** "Contract tests validate that two services agree on the data format between them. When AI generates endpoints independently, contract tests are the safety net that catches format inconsistencies before deployment."

### 3.5 Visual Regression Tests

**What it is:** Tests that take screenshots of UI components and compare them pixel-by-pixel against a known-good baseline. If a code change moves a button 3 pixels or changes a font color, the visual regression test flags it.

**Why it matters:** For frontend-heavy companies like Figma or Adobe, AI-generated UI code might subtly alter visual styling without breaking functional tests. Visual regression tests catch what functional tests miss.

### 3.6 Load Testing

**What it is:** Simulating thousands or millions of concurrent users to see how the application performs under stress. Tools like k6, Locust, or JMeter send a high volume of requests and measure response times, error rates, and resource consumption.

**Why it matters for an ADM:** AI-generated code that works at small scale often fails under load (Q29, Q38). Load testing in staging catches performance regressions before they hit production. Recommend it as part of the CI pipeline for any team where Agent mode is heavily used.

### 3.7 Test Tiering in CI

**What it is:** Organizing tests into tiers based on speed and scope, then running them at different stages:

| Tier | What | When it runs | Speed |
|------|------|-------------|-------|
| Tier 1 | Unit tests | Every commit | Seconds |
| Tier 2 | Integration tests | Every PR | Minutes |
| Tier 3 | E2E + load tests | Nightly or pre-release | Hours |

**Why it matters for an ADM:** When AI tools quadruple the test suite (Q33), all tests running in the same pipeline stage makes CI unbearably slow. Tiering keeps the feedback loop fast for developers while still running comprehensive tests before deployment.

---

## Part 4: CI/CD and Release Safety

### 4.1 CI (Continuous Integration)

**What it is:** An automated system that runs every time a developer pushes code: it compiles the code, runs tests, checks for linting errors, scans for security vulnerabilities, and reports whether everything passes. The most common CI tools are GitHub Actions, Jenkins, CircleCI, and GitLab CI.

**Think of it as:** A rigorous automated inspector that checks every piece of work before it's allowed into the building.

**Why it matters for an ADM:** CI is the automated quality gate. When AI tools accelerate code production, CI must scale to match. If the CI pipeline takes 45 minutes but developers are shipping PRs every 20 minutes, the pipeline becomes the bottleneck. A key ADM recommendation: "Tier your tests in CI so fast feedback comes fast, and comprehensive validation runs in parallel."

### 4.2 CD (Continuous Deployment / Continuous Delivery)

**What it is:** The automation that takes code from "CI passed" to "running in production." **Continuous Delivery** means code is always *ready* to deploy but requires a human to push the button. **Continuous Deployment** means code deploys automatically after CI passes.

**Why it matters:** The faster code deploys, the more important the quality of what CI checks. If AI-generated code passes CI (because tests are shallow) and auto-deploys, bugs reach production instantly.

### 4.3 Canary Deployments

**What it is:** Instead of deploying a new version to all users at once, you deploy it to a tiny percentage first (1-5%). If metrics look healthy (no errors, no latency increase), you gradually roll it out to more users. If something breaks, only 1% of users are affected.

**Think of it as:** The "canary in the coal mine" — a small group that signals danger before it spreads.

**Why it matters for an ADM:** Canary deployments are the safety net for the "ship faster, rollback more" problem (Q36). Even if AI-generated code passes CI, a canary deployment limits blast radius. Recommend this to any team where velocity has increased but reliability is a concern.

**How to talk about it:** "Progressive rollouts — canaries, percentage-based releases — give you a production-grade safety net. Instead of shipping to 100% and hoping, you validate with real traffic at 1% and only expand when metrics are clean."

### 4.4 Feature Flags

**What it is:** A feature flag is a toggle in code that lets you turn a feature on or off without deploying new code. You can enable a feature for specific users, a percentage of traffic, or specific environments. If the feature causes problems, you flip the flag off — no deployment needed.

**Why it matters:** Feature flags decouple "shipping code" from "enabling features." Developers can merge AI-generated features to main immediately (avoiding long-lived branches and merge conflicts — Q39) but keep the feature hidden until it's validated.

### 4.5 Rollbacks

**What it is:** Reverting a deployment to the previous known-good version when something goes wrong in production. A rollback is the emergency brake — it brings the system back to its last working state.

**Why it matters for an ADM:** Rollback rate is a quality signal. If a team's rollback rate increases after adopting AI tools (Q36), it means code is reaching production with undetected issues. The fix isn't to slow down — it's to strengthen the quality layers (better tests, canary deployments, more rigorous review).

---

## Part 5: Performance and Reliability

### 5.1 The N+1 Query Problem

**What it is:** A performance anti-pattern where code makes one database query to fetch a list of items, then makes a separate query for each item to fetch related data. Instead of 2 queries (one for the list, one for all related data), you end up with N+1 queries (1 for the list + N for each item).

**Concrete example:**
```
# BAD: N+1 — makes 101 queries for 100 orders
orders = db.query("SELECT * FROM orders LIMIT 100")
for order in orders:
    customer = db.query("SELECT * FROM customers WHERE id = ?", order.customer_id)
    # 1 query for orders + 100 queries for customers = 101 queries

# GOOD: Batch — makes 2 queries for 100 orders
orders = db.query("SELECT * FROM orders LIMIT 100")
customer_ids = [o.customer_id for o in orders]
customers = db.query("SELECT * FROM customers WHERE id IN (?)", customer_ids)
# 1 query for orders + 1 query for all customers = 2 queries
```

**Why AI generates this:** Agent mode solves for correctness, not performance. The N+1 pattern is functionally correct — it returns the right data. The AI doesn't know your production database has millions of rows. The fix: Rules that say "always use batch queries instead of loops."

### 5.2 Memory Leaks

**What it is:** A memory leak occurs when a program allocates memory but never releases it. Over time, memory usage grows until the process crashes or the system runs out of resources.

**Common causes in AI-generated code:**
- **Event listeners never cleaned up** — Agent mode adds a WebSocket listener in a function that gets called repeatedly. Each call adds a new listener; none are removed. After hours of operation, thousands of listeners consume all available memory.
- **Caching without eviction** — The AI implements an in-memory cache for performance but without a maximum size or expiration time. The cache grows forever.
- **Connection pool exhaustion** — Each function call opens a new database connection but doesn't release it back to the pool.

**Why tests don't catch it:** Unit tests run in milliseconds. Memory leaks only manifest under sustained operation — hours or days of continuous use. The test environment is too short-lived to observe the leak.

**How to talk about it:** "Memory leaks from AI-generated code are one of the harder production issues to catch. They're invisible in tests because tests are too short-lived. The fix is resource management Rules ('every listener needs cleanup, caches need TTL') plus sustained load testing in staging."

### 5.3 p95 Latency

**What it is:** The response time that is faster than 95% of all responses. If your p95 latency is 400ms, that means 95% of requests complete in 400ms or less — and 5% are slower. Teams track p95 (or p99) because averages hide outliers. An average of 50ms might mask 5% of requests taking 3 seconds.

**Why it matters for an ADM:** p95 latency is a reliability metric. If AI-generated code introduces slow queries or inefficient algorithms, p95 often degrades before the average does — it's an early warning signal. Recommend it as part of any performance monitoring setup.

### 5.4 APM (Application Performance Monitoring)

**What it is:** Tools that monitor application performance in real time: response times, error rates, database query durations, memory and CPU usage, and request traces. Common APM tools include Datadog, New Relic, Dynatrace, and Grafana.

**Why it matters:** APM tools are how teams diagnose the "Agent mode slowed our app" problem (Q29). They trace a slow endpoint back to the specific database query or function that's causing the issue, which can then be traced back to the specific PR that introduced it.

**How to talk about it:** "APM gives you the observability layer to connect performance changes to specific code changes. When a team reports that response times degraded after heavy Agent use, APM is how you pinpoint which endpoints, which queries, and which PRs introduced the regression."

### 5.5 Observability

**What it is:** The broader practice of understanding what's happening inside a system, built on three pillars:
1. **Logs** — Timestamped records of events ("User 123 logged in at 14:32")
2. **Metrics** — Numerical measurements over time (CPU usage, request count, error rate)
3. **Traces** — The full path of a request through the system (frontend → API gateway → auth service → database → response)

**Why it matters:** Observability is how operations teams detect and diagnose production issues. When AI-generated code causes problems that tests missed (Q30, Q34), observability is the last line of defense that catches them in production.

### 5.6 Runbooks

**What it is:** A documented step-by-step procedure for handling a specific operational scenario: "If the database connection pool is exhausted, do X. If the payment service is returning 500 errors, do Y." Runbooks turn incident response from improvisation into a repeatable process.

**Why it matters:** An ADM can help teams create runbooks for AI-specific failure modes: "If you suspect AI-generated code caused a performance regression, here's how to trace it with APM, identify the PR, and roll back."

---

## Part 6: Security and Governance

### 6.1 VPC (Virtual Private Cloud)

**What it is:** A private, isolated network within a cloud provider (AWS, GCP, Azure). Resources inside a VPC can communicate with each other, but traffic to/from the outside internet is strictly controlled. Think of it as a walled compound with a guarded gate.

**Why it matters for an ADM:** Some enterprises (like Samsung, BP, Sanofi) require that no developer tools send data outside their VPC. This is the Q10 scenario. The response: discuss self-hosted options or routing to a customer-hosted model endpoint within their VPC (bring-your-own-model).

**How to talk about it:** "For customers with a strict VPC requirement, we discuss self-hosted options so no code or telemetry leaves their network boundary. If evaluation takes time, we can start a pilot on non-sensitive code while the self-hosted architecture is assessed."

### 6.2 Least Privilege

**What it is:** The security principle that every person, system, or tool should have only the minimum access needed to do its job — and nothing more. A developer who only works on the frontend shouldn't have access to production database credentials.

**Why it matters:** When configuring AI tools, least privilege means: the AI should only see the code it needs for its task, not the entire codebase including secrets, credentials, and internal documentation that isn't relevant. Cursor Rules can limit what the AI accesses and references.

### 6.3 Dependency Governance

**What it is:** The process of controlling which external libraries (dependencies) can be used in a codebase. Every dependency is a piece of someone else's code that you're trusting to: (a) work correctly, (b) not contain security vulnerabilities, and (c) be maintained over time. **Supply chain attacks** exploit this trust by injecting malicious code into popular libraries.

**Common tools:**
- **Snyk** — Scans dependencies for known vulnerabilities
- **Dependabot** — Automatically creates PRs to update vulnerable dependencies
- **Socket** — Monitors for suspicious package behavior

**Why it matters for an ADM:** Q40 directly. AI tools suggest dependencies freely without knowing the organization's approved list. The fix: Rules referencing an approved-packages list, CI enforcement that blocks PRs adding new dependencies, and scanning tools as a safety net.

### 6.4 CODEOWNERS

**What it is:** A file in the repository that defines which people or teams must review changes to specific directories or files. If `CODEOWNERS` says "all changes to `services/auth/` require review from @security-team," then any PR touching auth code automatically requires that team's approval before merging.

**Why it matters:** CODEOWNERS creates human coordination points for sensitive code. It prevents the scenario in Q39 (two developers modifying the same shared service without coordination) and Q32 (AI refactoring security-critical code without security review).

### 6.5 Tenant Separation

**What it is:** In multi-tenant systems (where one platform serves many customers), tenant separation ensures that Customer A's data is completely isolated from Customer B's data. No query, no bug, no misconfiguration should ever expose one tenant's data to another.

**Why it matters:** For services companies like PwC and Deloitte, consultants work on many different clients' codebases. If Cursor is deployed to consultants, the AI should never learn from or reference Client A's code when working on Client B's code. Privacy Mode and admin controls are the key discussion points.

### 6.6 Audit Trails and Compliance

**What it is:** A tamper-proof record of who did what, when, and why. Regulated industries require audit trails for every change to production systems: who made the change, who approved it, what was changed, and when it was deployed.

**Key compliance frameworks:**
- **SOC 2** — Security, availability, processing integrity, confidentiality, privacy controls
- **HIPAA** — Healthcare data protection
- **SOX** — Financial reporting controls (public companies)
- **PCI-DSS** — Payment card data security
- **GxP** — Good Practice regulations for life sciences (pharma, biotech)

**Why it matters for an ADM:** Regulated companies (Sanofi, Stripe, PwC) need to know: does AI-generated code preserve our audit trail? Can we prove who approved it, that it was reviewed, and that it was tested? The answer is yes — AI code goes through the same PR/review/CI process — but you need to articulate this clearly.

**How to talk about it:** "AI-generated code flows through the same PR, review, and CI pipeline as human-written code. The audit trail is preserved: who created the PR, who reviewed and approved it, what tests ran, and when it deployed. For GxP or SOX environments, we can add additional Rules requiring documented justification for each change."

### 6.7 .cursorignore

**What it is:** A configuration file (like `.gitignore`) that tells Cursor which files or directories to exclude from its codebase index. Files listed in `.cursorignore` won't be used as context for AI suggestions or included in codebase searches.

**Why it matters:** Two key use cases: (1) excluding deprecated code so the AI stops referencing it (Q37), and (2) excluding sensitive directories (credentials, internal security tools) from the AI's context for security reasons. In regulated environments, `.cursorignore` is part of the security controls discussion.

---

## Part 7: Metrics and ROI

### 7.1 Activation Rate

**What it is:** The percentage of licensed users who have actually started using the tool in a meaningful way. "Meaningful" typically means beyond just installing it — actually using Agent mode, Chat, or Tab completions in their real workflow.

**Formula:** Activation Rate = (Users actively using Cursor features / Total licensed users) × 100

**Why it matters:** A common enterprise problem: a company buys 200 seats but only 50 people actually use it. The activation rate (25%) signals an enablement gap. An ADM's job is to close that gap through onboarding, champions, and workflow integration.

### 7.2 Depth of Use

**What it is:** Beyond activation — *how deeply* are users engaging? Are they only using Tab autocomplete (shallow), or are they using Agent mode, Chat, Rules, and @-mentions (deep)? Depth of use correlates with perceived value and renewal likelihood.

**Tiers:**
- **Light** — Tab completions only
- **Moderate** — Tab + Chat for Q&A and explanation
- **Deep** — Agent mode + Rules + codebase-aware workflows

### 7.3 Cycle Time

**What it is:** The elapsed time from when a developer starts working on a task to when that task is deployed to production. It includes coding time, review time, CI time, and deployment time.

**Why it matters:** Cycle time is the metric CTOs care about most. If Cursor reduces average cycle time from 5 days to 3.5 days, that's a 30% improvement — directly translatable to faster feature delivery, faster time-to-market, and more roadmap capacity.

**How to talk about it:** "We measure cycle time as the full journey from 'work started' to 'deployed in production.' Cursor typically compresses the build and review phases, but we also check that test and deploy phases aren't getting slower as a result."

### 7.4 PR Latency

**What it is:** The time between a PR being opened and being merged. Long PR latency often indicates review bottlenecks, large PRs, or unclear ownership.

**Why it matters:** AI tools should reduce PR latency (code is generated faster, Bugbot pre-screens for issues, reviewers spend less time on mechanical checks). If PR latency increases after Cursor adoption, it signals a process problem — possibly larger PRs or review fatigue.

### 7.5 Rollback Rate

**What it is:** The percentage of deployments that need to be reverted (rolled back) because they caused production issues. A healthy rollback rate is low (under 5%). If it's rising, code quality is degrading.

**Why it matters for an ADM:** Rollback rate is the counter-metric to velocity. A team might celebrate shipping 30% more PRs, but if rollback rate doubled, the net quality output might actually be worse. Always pair velocity metrics with quality metrics.

### 7.6 Escaped Defects

**What it is:** Bugs that "escape" the quality pipeline (tests, code review, staging) and reach production. The lower the escaped defect rate, the more effective the quality pipeline.

**Why it matters:** AI-generated code with shallow tests creates more escaped defects. Tracking this metric over time shows whether the team's quality guardrails are keeping up with increased AI-assisted velocity.

### 7.7 ROI Storytelling

**What it is:** Translating technical metrics into business outcomes that executives and finance teams care about.

**The translation:**

| Technical Metric | Business Outcome |
|-----------------|-----------------|
| 30% faster cycle time | Ship features 30% faster → faster time-to-market |
| 45 min/day saved per developer | 200 devs × 45 min = 150 hours/day recovered capacity |
| 25% fewer escaped defects | Fewer production incidents → lower incident costs, better customer trust |
| 50% faster onboarding | New hires productive in 2 weeks instead of 4 → faster ramp |

**How to talk about it:** "We measure adoption and engagement internally, but the story we tell the CFO is different: recovered engineering capacity, faster delivery against the roadmap, and reduced incident costs. The key is translating developer experience metrics into the language of business outcomes."

---

## Part 8: Change Management and Rollout

### 8.1 Champion Model

**What it is:** A rollout strategy where you identify 3-5 enthusiastic, respected engineers in each team or region and empower them to lead adoption. Champions get early access, deeper training, and a direct feedback channel. They then become the local advocates who help their peers — which is more effective than top-down mandates or external trainers.

**Why it matters:** Engineers trust other engineers more than they trust salespeople, corporate mandates, or documentation. A champion saying "this saved me 2 hours yesterday on that migration" is worth more than a polished demo.

### 8.2 Multi-Wave Rollout

**What it is:** Instead of enabling AI tools for everyone at once, you roll out in phases:

- **Wave 1 (Pilot)** — 10-20 engineers on a single team. Goal: prove value, identify issues, build the playbook.
- **Wave 2 (Expansion)** — 3-5 teams across different functions. Goal: validate that the playbook works across different workflows.
- **Wave 3 (Scale)** — Org-wide. Goal: standardize governance, measure aggregate ROI.

**Why it matters for an ADM:** This is literally your deployment strategy. Each wave has different priorities: Wave 1 is about learning, Wave 2 is about proving repeatability, Wave 3 is about scale and governance.

### 8.3 Enablement vs. Training

**What it is:** Training teaches people how to use a feature ("here's how Agent mode works"). Enablement helps people integrate the tool into their specific workflow ("here's how to use Agent mode to write integration tests for *your* Go microservices"). Enablement is harder but stickier.

**Why it matters:** High activation but low depth of use often signals that training happened but enablement didn't. The team knows what Cursor can do; they don't know how to make it work for *their* codebase, *their* patterns, *their* constraints.

### 8.4 Shadow AI

**What it is:** When employees use AI tools without organizational awareness or approval — personal accounts, unauthorized browser-based tools, copy-pasting code to ChatGPT. This creates security and compliance risks because the organization has no visibility into what data is being shared.

**Why it matters for an ADM:** Shadow AI is the argument *for* deploying an enterprise AI tool with controls. The alternative to managed Cursor adoption isn't "no AI" — it's uncontrolled, ungoverned AI usage that security can't monitor. Frame it as: "The question isn't whether your engineers will use AI. It's whether they'll use it with guardrails or without."

---

## Part 9: Industry-Specific Concepts

### 9.1 Embedded Systems and C/C++

**What it is:** Embedded systems are computers built into devices — car dashboards, medical devices, IoT sensors, Samsung TVs, NVIDIA GPU firmware. They're programmed in C and C++, languages that give precise control over hardware but require manual memory management (no garbage collector to clean up after you).

**Why it matters for an ADM:** Embedded teams have specific concerns: Cursor's AI may not handle C/C++ patterns as well as web languages (because there's less C/C++ in training data), the build systems are often custom and non-standard, and the testing requirements are different (hardware-in-the-loop testing, real-time constraints). Be honest about fit: embedded is usually a later-wave adoption candidate, with early value in documentation, test scaffolding, and CI scripting.

### 9.2 CUDA

**What it is:** NVIDIA's programming framework for running code on GPUs (Graphics Processing Units) instead of CPUs. GPUs can run thousands of operations in parallel, making CUDA essential for AI/ML training, scientific simulation, and graphics. CUDA code has unique constraints: thread management, memory hierarchy, and synchronization that standard AI tools may not handle well.

**Why it matters:** NVIDIA engineers write CUDA code. AI coding tools need to be positioned carefully here — useful for scaffolding, documentation, and standard logic, but not yet reliable for performance-critical CUDA kernel optimization.

### 9.3 GxP (Good Practice) and Validation

**What it is:** Regulatory standards for life sciences (pharmaceutical, biotech, medical devices) that require every change to be validated: documented, reviewed, tested, and traced. "GxP" is an umbrella term covering GMP (Good Manufacturing Practice), GLP (Good Laboratory Practice), and GCP (Good Clinical Practice).

**What validation means in software:** Every code change must have a documented reason, a test plan, evidence that it was tested, and a record of who approved it. Nothing changes in production without a controlled, auditable process.

**Why it matters:** For companies like Sanofi, AI-generated code must fit into this validation framework. The ADM's message: "AI-generated code enters the same controlled change process. The audit trail is preserved — PR history, review approvals, test results, deployment records. We can add Rules that require documented justification for each change."

### 9.4 PMS (Property Management System)

**What it is:** The software system that hotels (like Hilton) use to manage reservations, check-ins, room assignments, billing, and guest profiles. A PMS integrates with dozens of other systems: payment processors, channel managers (Booking.com, Expedia), loyalty programs, housekeeping systems, and door lock systems.

**Why it matters:** PMS environments are integration-heavy. AI can help teams write and test integration code, but the complexity of third-party system behavior means strong contract testing and integration testing are essential. AI-generated mocks of third-party systems may not accurately represent real behavior.

---

## Part 10: Connecting It All — The Diagnostic Framework

When a customer describes a problem, an ADM should diagnose it using this mental model:

### Step 1: Where in the SDLC did the problem originate?
- Build? (Bad code pattern)
- Test? (Shallow tests, missing coverage)
- Deploy? (No canary, no feature flags)
- Operate? (No monitoring, no alerting)

### Step 2: Why didn't the quality layers catch it?
- Unit tests? (Too shallow, happy-path only)
- Integration tests? (Missing or mocked too aggressively)
- Code review? (Rubber-stamped, reviewer fatigue)
- CI pipeline? (Not testing for this class of issue)
- Staging environment? (Doesn't match production conditions)

### Step 3: What guardrail would have prevented it?
- Rules? (Encoding patterns, restrictions, mandatory approaches)
- CI enforcement? (New pipeline checks)
- Review process? (Checklist, CODEOWNERS, senior review requirement)
- Observability? (Monitoring, alerting, APM)
- Deployment strategy? (Canary, feature flags, progressive rollout)

### Step 4: How do you frame the recommendation?
- Acknowledge the problem without blaming the tool
- Explain the gap (which quality layer had the blind spot)
- Propose the specific guardrail
- Connect it to business outcome (fewer incidents, faster recovery, lower risk)

**Example applying the framework to Q29 (performance degradation):**
1. **Originated in Build** — AI generated N+1 queries
2. **Missed by Tests** — Unit tests don't test performance; staging had small data
3. **Guardrail:** Performance Rules + load testing in CI + APM monitoring
4. **Frame it:** "Bugbot catches correctness issues. Performance requires a different layer of validation — we recommend adding performance-focused Rules and load testing to your CI pipeline."

---

*Last updated: March 30, 2026*
*This guide is your technical foundation. The Tactical Question Bank gives you the scenarios; this gives you the knowledge to diagnose and discuss them fluently.*

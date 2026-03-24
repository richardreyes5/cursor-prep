# The Cursor Product Guide

### Know the Tool Inside and Out — From Interface Basics to Enterprise Capabilities

> **Author:** Richard Reyes
> **Target Role:** AI Deployment Manager at Cursor
> **Approach:** This guide walks through Cursor as a product — what it does, how users navigate it, how it fits into developer workflows, and how enterprises buy and manage it. Written for a non-technical learner preparing to speak credibly about the product with developers and executives alike.

---

## Table of Contents

**Part I — What Cursor Is**
- [Chapter 1: The Big Picture](#chapter-1-the-big-picture)
- [Chapter 2: How Cursor Differs from the Competition](#chapter-2-how-cursor-differs-from-the-competition)

**Part II — Core Product Surfaces**
- [Chapter 3: Tab — Autocomplete, Reimagined](#chapter-3-tab--autocomplete-reimagined)
- [Chapter 4: Chat — A Conversation with Your Codebase](#chapter-4-chat--a-conversation-with-your-codebase)
- [Chapter 5: Cmd+K — The Inline Magic Wand](#chapter-5-cmdk--the-inline-magic-wand)
- [Chapter 6: Agent Mode — Autonomous Coding](#chapter-6-agent-mode--autonomous-coding)
- [Chapter 7: Cloud Agents — Coding Without Your Laptop](#chapter-7-cloud-agents--coding-without-your-laptop)

**Part III — Context & Customization**
- [Chapter 8: Context Awareness — Why Cursor "Gets" Your Code](#chapter-8-context-awareness--why-cursor-gets-your-code)
- [Chapter 9: Rules, Skills & Commands — Teaching Cursor Your Standards](#chapter-9-rules-skills--commands--teaching-cursor-your-standards)
- [Chapter 10: MCP, Plugins & the Marketplace — Connecting Your Stack](#chapter-10-mcp-plugins--the-marketplace--connecting-your-stack)
- [Chapter 11: Automations — Always-On Agents](#chapter-11-automations--always-on-agents)

**Part IV — Additional Surfaces & Tools**
- [Chapter 12: Bugbot — AI Code Review](#chapter-12-bugbot--ai-code-review)
- [Chapter 13: Cursor Everywhere — CLI, JetBrains, Web & Mobile](#chapter-13-cursor-everywhere--cli-jetbrains-web--mobile)
- [Chapter 14: Debug Mode & Browser Mode](#chapter-14-debug-mode--browser-mode)

**Part V — Enterprise & Go-to-Market**
- [Chapter 15: Pricing & Plans](#chapter-15-pricing--plans)
- [Chapter 16: Enterprise Features & Security](#chapter-16-enterprise-features--security)
- [Chapter 17: Social Proof — Who Uses Cursor and Why](#chapter-17-social-proof--who-uses-cursor-and-why)

**Appendix**
- [Product Feature Quick-Reference Table](#product-feature-quick-reference-table)
- [Key Keyboard Shortcuts](#key-keyboard-shortcuts)
- [Models Available in Cursor](#models-available-in-cursor)
- [Glossary of Cursor-Specific Terms](#glossary-of-cursor-specific-terms)

---

# Part I — What Cursor Is

---

## Chapter 1: The Big Picture

### What Is Cursor?

Cursor is an **AI-native code editor**. It looks and feels like VS Code (Visual Studio Code) — the most popular code editor among professional developers — because it's built on the same open-source foundation. But where VS Code treats AI as an optional add-on (a plugin), Cursor was redesigned from the ground up with AI woven into every interaction.

**The analogy:** Imagine two cars. One is a regular car with a phone mount on the dashboard (VS Code + a Copilot plugin). The other is a car whose navigation, climate, music, and driving assistance are all built into a single integrated system from the factory (Cursor). The second car's experience is fundamentally smoother because everything was designed to work together.

### Who Makes Cursor?

Cursor is built by **Anysphere**, a company founded in 2022 and headquartered in San Francisco. As of late 2025, Anysphere has:

- Raised a **$2.3 billion Series D** at a **$29.3 billion valuation**
- Crossed **$1 billion in annualized revenue**
- Grown to a team of **300+ people** (engineers, researchers, designers, operators)
- Investors include Accel, Thrive, Andreessen Horowitz, Coatue, NVIDIA, and Google

> **Why this matters for your interviews:** Cursor isn't a scrappy startup anymore — it's one of the fastest-growing developer tools in history, with deep backing and enterprise traction. When you talk to candidates or customers, you're representing a company that the biggest names in tech (NVIDIA, Google, Stripe, Salesforce) already trust.

### The Mission

Cursor's stated mission is to **automate coding**. The first step: build the best tool for professional programmers. The long-term vision is a world where the source code itself starts to "melt away" — meaning developers spend less time typing and more time directing, reviewing, and making decisions.

---

## Chapter 2: How Cursor Differs from the Competition

### The Competitive Landscape

| Tool | What It Is | Relationship to Cursor |
|------|-----------|----------------------|
| **GitHub Copilot** | An AI autocomplete plugin for VS Code, JetBrains, etc. | Cursor's most direct competitor. Plugin vs. integrated editor. |
| **VS Code** | The free, open-source editor that Cursor is built on | Cursor's foundation. Developers switching to Cursor keep their extensions, shortcuts, and settings. |
| **JetBrains IDEs** | Popular paid editors for Java, Python, and other languages | Cursor now integrates with JetBrains through the Agent Client Protocol (ACP). |
| **Windsurf (Codeium)** | Another AI-native editor | A newer entrant; Cursor has a significant lead in enterprise adoption. |
| **ChatGPT / Claude (standalone)** | General-purpose AI chatbots | Developers use these for coding questions, but they can't see your project. Cursor embeds these models *inside* the editor with full project context. |

### Why Cursor Wins Head-to-Head

In enterprise evaluations, **93% of engineers select Cursor** as their preferred AI coding tool. The reasons come down to three architectural advantages:

1. **Depth of context** — Cursor indexes your entire codebase and feeds the right files to the AI automatically. A plugin can only see what's currently open.
2. **Agent capabilities** — Cursor can autonomously edit multiple files, run terminal commands, search the web, and iterate on errors. Plugins are limited to suggestion-level assistance.
3. **Team-level configuration** — Rules, Skills, and admin controls let organizations standardize AI behavior across hundreds or thousands of developers.

> **How to talk about this in an interview:** "The core difference is architectural. Copilot is great at autocomplete, but it's constrained by what a plugin can access. Cursor rebuilt the entire editor around AI, so it can do things — like multi-file Agent workflows and team-wide Rules — that no plugin can match."

---

# Part II — Core Product Surfaces

These are the features every ADM (AI Deployment Manager) needs to understand cold. Each one maps to a different level of developer trust and a different enterprise use case.

---

## Chapter 3: Tab — Autocomplete, Reimagined

### What It Is

As a developer types, Cursor predicts what they're about to write and shows a gray "ghost text" suggestion. Press **Tab** to accept. It's like autocomplete on your phone, but for code — and far more powerful.

### What Makes Cursor's Tab Special

| Feature | How It Works |
|---------|-------------|
| **Multi-line predictions** | Doesn't just finish the current line — suggests entire blocks of code |
| **Cross-file awareness** | Knows what's in your other files and suggests code that fits the bigger picture |
| **In-session context** | Sees your current task, recent changes, and relevant files to inform suggestions |
| **Proprietary model** | Built exclusively for Cursor, trained with RL (Reinforcement Learning) — a technique where the model improves by learning from real developer feedback |
| **Speed** | Suggestions appear nearly instantly — developers won't tolerate lag |

### Why It Matters for Adoption

Tab is the **lowest-friction entry point** to AI-assisted coding. The developer doesn't have to change anything about their workflow — suggestions simply appear. This is why Tab is always the recommended starting point in a pilot: it builds passive trust with zero behavior change.

> **The adoption insight:** Tab suggestions that developers accept are an early signal of engagement. Cursor tracks an **acceptance rate** — the percentage of AI suggestions that developers keep. Rising acceptance rates tell you developers are finding value.

---

## Chapter 4: Chat — A Conversation with Your Codebase

### What It Is

Open Chat with **Cmd+L** (Mac) or **Ctrl+L** (Windows/Linux). A side panel appears where you can ask questions or give instructions in plain English. Unlike ChatGPT, Cursor's Chat can see your entire project — it knows your files, functions, and patterns.

### Common Use Cases

| Use Case | Example Prompt | Who Benefits Most |
|----------|---------------|-------------------|
| **Explain code** | "What does this function do?" | New hires, developers onboarding to unfamiliar code |
| **Ask architecture questions** | "How does our payment flow handle failed transactions?" | Any developer navigating a complex codebase |
| **Generate code** | "Write a function that validates email addresses" | All developers |
| **Debug errors** | "I'm getting this error — what's wrong?" (paste the error) | All developers |
| **Write documentation** | "Generate API docs for this module" | Teams with documentation gaps |

### The @-Mention System

The real power of Chat is **@-mentions** — a way to point the AI at exactly the right context:

| @-Mention | What It Does |
|-----------|-------------|
| `@file` | Pull a specific file into the conversation |
| `@folder` | Reference an entire folder |
| `@codebase` | Search across the whole project |
| `@web` | Search the internet for up-to-date information |
| `@docs` | Reference external documentation |
| `@Branch` | Give the AI context about your current work-in-progress |
| `@Past Chats` | Reference previous conversations so you don't repeat yourself |

> **Enterprise value:** Chat with `@codebase` dramatically reduces onboarding time. Instead of interrupting a colleague with "Where is X?" or "How does Y work?", a developer asks Cursor. Salesforce reported that junior engineers who started during COVID — and missed in-person mentorship — used Chat to catch up on complex codebases.

---

## Chapter 5: Cmd+K — The Inline Magic Wand

### What It Is

Select a block of code, press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux), type a plain-English instruction, and Cursor rewrites the selected code to match your request.

### Examples

| Instruction | What Happens |
|-------------|-------------|
| "Add error handling and retry logic" | Cursor wraps the function in try/catch blocks and adds retry behavior |
| "Convert this to TypeScript" | Cursor adds type annotations throughout |
| "Make this more readable" | Cursor refactors the code for clarity |
| "Add input validation" | Cursor adds checks for invalid data |

### Why It Matters

Cmd+K is often where the **"aha moment"** happens — the first time a developer sees Cursor do something genuinely surprising. It's the feature that turns a skeptic into a pragmatist, or a pragmatist into a champion.

> **For demos and workshops:** Always have developers bring a real piece of their own code to Cmd+K. A contrived example is forgettable; transforming *their* code in front of their eyes is unforgettable.

---

## Chapter 6: Agent Mode — Autonomous Coding

### What It Is

Agent mode is Cursor's most powerful capability. Instead of suggesting one change at a time, Agent can autonomously:

- Edit multiple files across the project
- Run terminal commands (builds, tests, installs)
- Search the codebase and the web
- Iterate on errors — if something breaks, it tries to fix it
- Create, delete, and reorganize files

### The Autonomy Slider

Think of Cursor's features as an **autonomy slider**, moving from least to most autonomous:

| Level | Feature | Analogy |
|-------|---------|---------|
| 1 | **Tab** | Autocomplete on your phone — small, passive suggestions |
| 2 | **Chat** | Texting a knowledgeable colleague with questions |
| 3 | **Cmd+K** | Handing a skilled editor a paragraph and saying "fix this" |
| 4 | **Agent** | Hiring a contractor who shows up, does the work, and checks it themselves |
| 5 | **Cloud Agent** | A contractor who works overnight in their own office and sends you a PR to review in the morning |

### Plan Mode

For complex tasks, developers toggle **Plan Mode** (Shift+Tab). Instead of jumping into code immediately, Agent:

1. Researches the codebase to find relevant files
2. Asks clarifying questions about requirements
3. Creates a detailed plan as a reviewable Markdown document
4. Waits for approval before executing

This is critical for enterprise trust — senior engineers and tech leads want to review the *approach* before the AI starts writing code.

### Parallel Agents & Worktrees

Cursor supports running **multiple agents in parallel**, each in an isolated git worktree (a separate workspace so changes don't interfere with each other). Developers can:

- Run the same prompt on multiple AI models and compare results
- Work on several features simultaneously
- Let agents run in the background while focusing on other work

> **Enterprise talking point:** "Agent mode is where the biggest productivity gains live. It's the difference between AI that helps you type faster and AI that handles entire tasks end to end — writing code, running tests, and iterating until it works."

---

## Chapter 7: Cloud Agents — Coding Without Your Laptop

### What It Is

Cloud Agents run in isolated virtual machines in the cloud — not on the developer's local machine. A developer describes a task, and the agent clones the repository, writes code, runs tests, and opens a pull request — all autonomously.

### How It Works

1. Developer describes the task (from the web, mobile, Slack, or the desktop editor)
2. Cursor provisions an isolated VM (Ubuntu, 4 CPU cores, 15 GB RAM)
3. The agent clones the repo and creates a branch
4. It works autonomously — editing, building, testing
5. When finished, it opens a pull request for human review
6. The developer gets notified via Slack, email, or the web interface

### Where You Can Start Cloud Agents

| Surface | How |
|---------|-----|
| **Web** | [cursor.com/agents](https://cursor.com/agents) |
| **Mobile** | Progressive Web App (PWA) — installable on iOS and Android |
| **Desktop** | Select "Cloud" in the agent dropdown within Cursor |
| **Slack** | Type `@Cursor` in any channel |
| **GitHub** | Comment `@cursor` on a PR or issue |
| **Linear** | Type `@cursor` on a ticket |

### Why Cloud Agents Matter for Enterprise

- **Asynchronous work** — Developers delegate tasks and review results later; they don't have to watch the AI work in real time
- **Parallelism** — A single developer can have multiple cloud agents running simultaneously on different tasks
- **Mobile access** — Engineers can kick off and monitor work from their phone
- **No local resource drain** — The heavy compute happens in the cloud, not on the developer's laptop

> **Interview-ready sentence:** "Cloud agents let developers treat coding tasks like a to-do list. Describe the task, let the agent work in the background, and review the pull request when it's ready — even from your phone."

---

# Part III — Context & Customization

These features are what make Cursor scalable for enterprise teams. They're the reason 40,000 NVIDIA engineers and 20,000+ Salesforce developers can all use Cursor effectively with consistent standards.

---

## Chapter 8: Context Awareness — Why Cursor "Gets" Your Code

### Codebase Indexing

When a developer opens a project in Cursor, it **indexes the entire codebase** using a custom embedding model. This creates a searchable map of the project — not just file names, but the *meaning* of the code.

**What this means in practice:** When a developer asks "How does our payment flow handle failed transactions?", Cursor doesn't just search for the word "payment." It understands the *concept* and finds the relevant files, even if they use different terminology.

### Why Context Is Cursor's Moat

The #1 problem with AI coding tools is giving the AI enough context to be useful. If the AI can only see the current file, its suggestions will be generic. Cursor's deep context awareness — indexing, @-mentions, recent edits, cursor position, project structure — means it gives answers grounded in *your actual codebase*, not generic code from the internet.

### Secure Indexing at Scale

For large enterprise codebases (think: millions of lines across thousands of files), Cursor has built **secure codebase indexing** that can reuse a teammate's existing index. This cuts time-to-first-query from hours to seconds on the largest repos, without compromising security.

> **Enterprise talking point:** "Context awareness is what separates Cursor from general-purpose AI tools. ChatGPT gives you generic code. Cursor gives you code that fits *your* project, *your* patterns, and *your* team's conventions."

---

## Chapter 9: Rules, Skills & Commands — Teaching Cursor Your Standards

### Rules: Persistent Instructions

Rules are Markdown files stored in `.cursor/rules/` that shape how the AI behaves across every conversation. They're version-controlled (checked into Git), so the entire team shares the same standards.

**Examples of what teams put in Rules:**
- Coding standards ("Use ES modules, not CommonJS")
- Build commands ("Run `npm run build` to build the project")
- Architectural decisions ("API routes go in `app/api/`")
- Pointers to canonical examples ("See `Button.tsx` for our component pattern")

**Why Rules matter at scale:** Without Rules, every developer gets slightly different AI output. With Rules, an organization of 500 engineers gets consistent, standards-compliant code suggestions — the AI follows the same conventions a human code reviewer would enforce.

### Skills: Dynamic Capabilities

Skills are more advanced — they're packaged workflows and domain knowledge that the agent can invoke when relevant. Unlike Rules (which are always on), Skills load dynamically.

**Examples:**
- `/fix-merge-conflicts` — Automatically resolve Git conflicts
- `/code-review` — Analyze code for issues and improvements
- `/pr` — Commit, push, and create a pull request in one step
- `/test` — Generate unit tests for selected code

### Commands: Repeatable Workflows

Commands are stored in `.cursor/commands/` and triggered with `/` in the agent input. They automate multi-step workflows the team runs repeatedly.

> **Why this matters for ADMs:** Rules, Skills, and Commands are how you operationalize AI adoption at the enterprise level. During a rollout, you'll help teams configure their Rules to enforce coding standards, create Commands for common workflows, and ensure consistency across hundreds of developers.

---

## Chapter 10: MCP, Plugins & the Marketplace — Connecting Your Stack

### MCP (Model Context Protocol)

MCP is an open standard that lets Cursor connect to external tools and data sources. Think of it as a universal adapter: instead of building a custom integration for every tool, MCP provides one standardized way for the AI to talk to any service.

**What agents can do with MCP:**
- Read Slack messages and respond
- Investigate Datadog logs and metrics
- Debug errors from Sentry
- Query databases
- Pull designs from Figma
- Create issues in Linear or Jira

### The Cursor Marketplace

The [Cursor Marketplace](https://cursor.com/marketplace) is a curated library of official plugins — each one manually reviewed for security. Plugins bundle together MCP servers, Skills, Commands, and Rules for a specific tool or workflow.

**Major plugin partners (as of March 2026):**

| Category | Partners |
|----------|----------|
| **Infrastructure** | Datadog, GitLab, PlanetScale, AWS, Cloudflare, Vercel |
| **Planning & Design** | Linear, Figma, Atlassian, monday.com |
| **Payments** | Stripe |
| **Analytics** | Amplitude, Databricks, Snowflake, Hex |
| **AI & ML** | Hugging Face |
| **Search & Knowledge** | Glean |

### Team Marketplaces

On Teams and Enterprise plans, admins can create **private team marketplaces** to distribute internal plugins with centralized governance. This means a company can build its own custom MCP integrations and share them securely across the organization.

> **Enterprise talking point:** "Cursor doesn't just help you write code — it connects to the tools your team already uses. Through MCP and the Marketplace, an agent can read a Slack message about a bug, look up the error in Datadog, find the relevant code, fix it, and open a pull request — all without the developer leaving Cursor."

---

## Chapter 11: Automations — Always-On Agents

### What It Is

Automations are **always-on cloud agents** that run automatically based on triggers and schedules. Instead of a developer manually starting an agent, the agent fires in response to events happening across the development workflow.

### Available Triggers

| Trigger Source | Example Events |
|---------------|----------------|
| **Schedule** | Daily at 9 AM, every Monday, cron expressions |
| **GitHub** | PR opened, PR merged, push to branch, CI completed |
| **Slack** | New message in a channel |
| **Linear** | Issue created, status changed, cycle completed |
| **PagerDuty** | Incident triggered, acknowledged, or resolved |
| **Webhooks** | Any custom HTTP event |

### Real-World Use Cases

| Automation | What It Does |
|-----------|-------------|
| **Security review on every PR** | Scans new pull requests for vulnerabilities before merge |
| **Bug triage** | When a new bug is filed in Linear, the agent investigates the codebase and adds context |
| **Incident response** | PagerDuty alert triggers an agent that examines logs, identifies likely root causes, and drafts a fix |
| **Weekly repo summary** | Every Monday, an agent summarizes the week's changes for the engineering lead |
| **Test coverage** | On every merge, an agent checks if new code includes tests and flags gaps |

### Memory Tool

Automations include a **memory tool** that lets agents learn from past runs and improve over time. The more an automation runs, the better it gets at the specific task.

> **Why this matters for ADMs:** Automations are the next frontier of enterprise value. Once a team has adopted Cursor for manual coding, Automations extend the value to *operational workflows* — the kind of repetitive, process-driven work that eats engineering time. This is a powerful expansion lever.

---

# Part IV — Additional Surfaces & Tools

---

## Chapter 12: Bugbot — AI Code Review

### What It Is

Bugbot is Cursor's **automated code review tool** that runs on pull requests in GitHub. When a developer opens a PR, Bugbot automatically analyzes the changes, flags potential bugs, and suggests fixes — before a human reviewer even looks at it.

### Key Characteristics

| Feature | Detail |
|---------|--------|
| **Focuses on real bugs** | Optimizes for logic bugs, not style nits — high signal, low noise |
| **70%+ fix rate** | More than 70% of Bugbot flags get resolved before merge |
| **Custom rules** | Teams can define their own review standards that Bugbot enforces |
| **Runs in CI** | Appears as a check alongside tests and linters in the PR workflow |

### Pricing

| Plan | Cost | Includes |
|------|------|---------|
| **Pro** | $40/user/month | Reviews on up to 200 PRs/month, access to Bugbot rules |
| **Teams** | $40/user/month | Reviews on all PRs, analytics dashboard, advanced settings |
| **Enterprise** | Custom | Advanced analytics, priority support |

All plans include a free trial (14 days for Pro/Teams, 30 days for Enterprise).

### What Customers Say

- **Sentry:** "The hit rate from Bugbot is insane. Catching bugs early saves huge downstream cost."
- **Discord:** "Bugbot finds real bugs after human approval. Avoiding one sev pays for itself."
- **Rippling:** "Bugbot helps give back 40% of time spent on code reviews."

> **Enterprise talking point:** "Bugbot catches the bugs that human reviewers miss. It's not a replacement for code review — it's an extra safety net that runs automatically on every PR. When 70%+ of its flags get fixed, that tells you it's finding real issues."

---

## Chapter 13: Cursor Everywhere — CLI, JetBrains, Web & Mobile

Cursor is no longer just a desktop editor. It now spans multiple surfaces:

### Desktop (The Core Editor)

The primary Cursor experience — a full-featured IDE with all the capabilities described in this guide. Available for macOS, Windows, and Linux.

### CLI (Command Line Interface)

Run Cursor agents directly from any terminal. Useful for:
- Developers who prefer working in the terminal
- Scripting and automation pipelines
- CI/CD (Continuous Integration / Continuous Deployment) integration

### JetBrains IDEs (New as of March 2026)

Cursor is now available in **IntelliJ IDEA, PyCharm, WebStorm**, and other JetBrains IDEs through the **ACP (Agent Client Protocol)**. This is significant because many Java developers prefer JetBrains IDEs — this removes a major switching barrier for enterprise Java teams.

### Web & Mobile

Cloud agents are accessible from any browser at [cursor.com/agents](https://cursor.com/agents) and can be installed as a PWA (Progressive Web App) — a website that behaves like a native app — on iOS and Android. Engineers can start, monitor, and review agent work from their phone.

> **Why "Cursor Everywhere" matters for enterprise:** IT teams worry about tool fragmentation. The fact that Cursor works across desktop, JetBrains, CLI, web, and mobile — plus integrates with Slack, GitHub, and Linear — means it meets developers wherever they already work. Less friction = higher adoption.

---

## Chapter 14: Debug Mode & Browser Mode

### Debug Mode

When a developer encounters a tricky bug that standard agent interactions can't solve, **Debug Mode** takes a different, evidence-based approach:

1. Generates multiple hypotheses about what could be wrong
2. Instruments the code with logging (adds temporary tracking to see what's happening at runtime)
3. Asks the developer to reproduce the bug while collecting data
4. Analyzes actual execution data to pinpoint the root cause
5. Makes targeted fixes based on evidence, not guesswork

**Best for:** Bugs that are reproducible but hard to diagnose — race conditions (timing issues), performance problems, and regressions (something that used to work but broke).

### Browser Mode

Cursor includes a built-in browser sidebar that lets the agent:

- Navigate web pages
- Take screenshots
- Interact with UI elements
- Verify visual changes

**Use cases:** Testing a web app visually, matching a design mockup, checking that a UI change looks correct across different states.

> **For your interviews:** Debug Mode and Browser Mode show that Cursor isn't just about *writing* code — it helps across the full lifecycle: writing, testing, debugging, and visual verification.

---

# Part V — Enterprise & Go-to-Market

This section covers the business side of Cursor — the information you'll use in conversations with CTOs, procurement teams, and finance stakeholders.

---

## Chapter 15: Pricing & Plans

### Individual Plans

| Plan | Price | Key Features |
|------|-------|-------------|
| **Hobby** | Free | Limited Agent requests and Tab completions. No credit card required. |
| **Pro** | $20/month | Extended Agent limits, access to frontier models, MCPs, Skills, Hooks, Cloud Agents |
| **Pro+** | $60/month | Everything in Pro + 3x usage on all OpenAI, Claude, and Gemini models |
| **Ultra** | $200/month | Everything in Pro + 20x usage + priority access to new features |

### Business Plans

| Plan | Price | Key Features |
|------|-------|-------------|
| **Teams** | $40/user/month | Shared chats/commands/rules, centralized billing, usage analytics, org-wide privacy mode, RBAC (Role-Based Access Control), SAML/OIDC SSO (Single Sign-On) |
| **Enterprise** | Custom | Pooled usage, invoice/PO billing, SCIM seat management (automated user provisioning), AI code tracking API, audit logs, granular admin controls, priority support, dedicated account management |

### The ROI Math (Know This Cold)

This is the back-of-napkin calculation you should be able to do in any conversation:

- **100 developers** x $180K average fully-loaded cost = **$18M/year** in engineering spend
- If Cursor saves each developer **1 hour/day** (12.5% productivity gain)
- That's equivalent to **$2.25M/year** in recovered productivity
- Cursor Teams costs $40/user/month = **$48K/year** for 100 developers
- **ROI: ~47x return on investment**

Scale this for any customer: 500 developers = $240K/year for Cursor vs. $11.25M in recovered productivity.

---

## Chapter 16: Enterprise Features & Security

### Security & Compliance

Security is the **#1 concern** of every enterprise CTO evaluating an AI coding tool. Cursor addresses this with:

| Capability | What It Means |
|-----------|---------------|
| **Privacy Mode** | When enabled, code is never stored on Cursor's servers and never used for model training |
| **Zero data retention** | No training on customer data by Cursor or any LLM provider (Large Language Model — the AI that powers code generation) |
| **SOC 2 Type 2** | An industry-standard security certification. "Type 2" means it's been audited over time, not just at a single point. |
| **GDPR & CCPA compliant** | Meets European (GDPR) and California (CCPA) data privacy regulations |
| **AES-256 encryption at rest** | Data stored on disk is encrypted with one of the strongest encryption standards available |
| **TLS 1.2+ in transit** | Data moving between the developer's machine and Cursor's servers is encrypted |
| **Annual penetration testing** | External security experts regularly try to break in, and Cursor fixes any issues found |

### Admin Controls

| Control | What It Does |
|---------|-------------|
| **SAML/OIDC SSO** | Employees log in with their company credentials (Okta, Azure AD, etc.) |
| **SCIM provisioning** | When someone joins or leaves the company in HR systems, their Cursor account is automatically created or removed |
| **Model access controls** | Admins decide which AI models developers can use |
| **MCP controls** | Admins control which external integrations are allowed |
| **System-level agent rules** | Organization-wide Rules that apply to every developer |
| **Usage analytics** | Dashboards showing adoption rates, feature usage, and active users |
| **AI code tracking API & audit logs** | Track what AI-generated code is being used and maintain an audit trail |

> **How to talk about security in interviews:** "Privacy and security are table stakes for enterprise AI. Cursor's Privacy Mode ensures code never leaves the customer's control, it's SOC 2 Type 2 certified, and admins have granular controls over models, integrations, and access — all backed by zero data retention guarantees."

---

## Chapter 17: Social Proof — Who Uses Cursor and Why

### By the Numbers

| Metric | Figure |
|--------|--------|
| Fortune 500 companies using Cursor | **64%** |
| Enterprises choosing Cursor | **50,000+** |
| Lines of enterprise code written per day | **100M+** |

### Notable Customer Quotes

These are the quotes you should have ready for any conversation:

**Scale — NVIDIA (40,000 engineers):**
> "My favorite enterprise AI service is Cursor. Every one of our engineers, some 40,000, are now assisted by AI and our productivity has gone up incredibly." — **Jensen Huang, CEO**

**Developer Love — Stripe:**
> "Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. We spend more on R&D and software creation than any other undertaking, and there's significant economic outcomes when making that process more efficient." — **Patrick Collison, CEO**

**Rapid Adoption — Coinbase:**
> "By February 2025, every Coinbase engineer had utilized Cursor, which has become the preferred IDE for most of our developers. Single engineers are now refactoring, upgrading, or building new codebases in days instead of months." — **Brian Armstrong, CEO**

**Measurable Impact — Salesforce (20,000+ engineers):**
> "We have seen more than double-digit increases in [cycle time, quality, and throughput]." — **Shan Appajodu, SVP of Engineering**

**Growth Velocity — Rippling:**
> "Cursor has transformed the way our engineering teams write and ship code, with adoption growing from 150 to over 500 engineers (~60% of our org!) in just a few weeks." — **Albert Strasheim, CTO**

**Org-Wide Impact — Brex:**
> "More than 70% of our engineers now use Cursor, and we've seen meaningful gains in day-to-day development, faster execution on large-scale migrations, increased rate of debugging, and even faster onboarding." — **James Reggio, CTO**

**Industry Vision — Y Combinator:**
> "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor." — **Diana Hu, General Partner**

### The Salesforce Case Study (In Depth)

Salesforce is one of the most impressive enterprise deployments to date:

- **75% adoption** within the engineering organization
- **>30% increase** in PR velocity for developers using Cursor
- **85% decrease** in test coverage time for legacy code on one team
- Junior engineers who missed in-person mentorship during COVID used Cursor Chat to ramp up on complex codebases
- Senior engineers started with boring, tedious tasks, built trust, then expanded to higher-value use cases
- Adoption followed a classic pattern: a small group tried it, saw impact, and the rest followed

> **Why case studies matter for ADMs:** Your job is to replicate these success patterns at new customers. When a CTO says "How do I know this will work at our scale?", you point to Salesforce (25 years of code, thousands of engineers) and say: "They saw double-digit improvements in velocity, quality, and throughput — and adoption spread organically once developers saw the value."

---

# Appendix

---

## Product Feature Quick-Reference Table

| Feature | Shortcut | Trust Level | Primary Use Case | Enterprise Value |
|---------|----------|-------------|-----------------|-----------------|
| **Tab** | (automatic) | Low — passive suggestions | Autocomplete as you type | Zero-friction starting point; builds passive trust |
| **Chat** | Cmd+L | Medium — ask questions | Codebase Q&A, explanations, generation | Reduces onboarding time, eliminates colleague interruptions |
| **Cmd+K** | Cmd+K | Medium-High — edit code | Inline transforms in plain English | "Aha moment" driver; converts skeptics |
| **Agent** | (default mode) | High — autonomous work | Multi-file tasks, refactoring, feature building | Biggest productivity gains; handles end-to-end tasks |
| **Cloud Agent** | Web/Mobile/Slack | Highest — runs independently | Async tasks, background work, parallel execution | Multiplies developer output; works while they sleep |
| **Bugbot** | (automatic on PRs) | N/A — review tool | Automated code review on pull requests | Catches bugs human reviewers miss; 70%+ fix rate |
| **Automations** | (trigger-based) | N/A — always-on | Scheduled/event-driven workflows | Operational efficiency; security scanning; incident response |

---

## Key Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Accept Tab suggestion | Tab | Tab |
| Open Chat | Cmd+L | Ctrl+L |
| Inline Edit | Cmd+K | Ctrl+K |
| Toggle Plan Mode | Shift+Tab (in agent input) | Shift+Tab (in agent input) |
| Command Palette | Cmd+Shift+P | Ctrl+Shift+P |

---

## Models Available in Cursor

Cursor gives developers access to frontier AI models from multiple providers. As of March 2026:

| Provider | Models |
|----------|--------|
| **Cursor** | Composer 2 (Cursor's in-house coding model) |
| **OpenAI** | GPT-5.2, Codex 5.3 |
| **Anthropic** | Claude Opus 4.6, Sonnet 4.5 |
| **Google** | Gemini 3 Pro |
| **xAI** | Grok Code |

Cursor also has an **Auto** mode that selects the best model for each task automatically. Enterprise admins can restrict which models developers are allowed to use.

---

## Glossary of Cursor-Specific Terms

| Term | Definition |
|------|-----------|
| **Agent** | Cursor's autonomous coding mode that can edit files, run commands, and iterate on errors |
| **Cloud Agent** | An agent that runs in a remote VM, not on the developer's machine |
| **Automation** | An always-on cloud agent triggered by events (GitHub PRs, Slack messages, schedules) |
| **Bugbot** | Cursor's automated code review tool for pull requests |
| **Codebase Indexing** | The process of scanning and understanding an entire project so the AI can answer questions about any part of it |
| **Composer 2** | Cursor's in-house AI model, purpose-built for coding tasks |
| **Context Window** | The amount of text/code the AI can "see" at once — like its short-term memory |
| **MCP (Model Context Protocol)** | An open standard for connecting AI to external tools (Slack, Datadog, Figma, etc.) |
| **Marketplace** | Cursor's curated library of official plugins |
| **Plugin** | A package that bundles MCP servers, Skills, Commands, and Rules for a specific tool or workflow |
| **Privacy Mode** | Enterprise setting that ensures code is never stored or used for training |
| **Rules** | Markdown files in `.cursor/rules/` that give the AI persistent instructions (coding standards, patterns) |
| **Skills** | Dynamic capabilities the agent can invoke when relevant (like `/pr` or `/test`) |
| **Commands** | Reusable, team-shared workflow shortcuts triggered with `/` in the agent input |
| **Hooks** | Scripts that run before or after agent actions (e.g., keep iterating until all tests pass) |
| **Tab** | Cursor's AI autocomplete that predicts what you'll type next |
| **Worktree** | An isolated git workspace that lets multiple agents work in parallel without interfering |
| **ACP (Agent Client Protocol)** | The protocol that lets Cursor run inside JetBrains IDEs |
| **PWA (Progressive Web App)** | A website that can be installed and used like a native mobile app |
| **SSO (Single Sign-On)** | Log in once with company credentials to access multiple tools |
| **SCIM** | Automated user provisioning — syncs employee accounts with HR systems |
| **SOC 2 Type 2** | A security certification that demonstrates ongoing compliance with data security standards |

---

*Last updated: March 24, 2026*
*Built with the same care as the study guide — know this product cold, Richard.*

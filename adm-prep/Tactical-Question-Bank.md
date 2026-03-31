# Tactical Question Bank — Persona & Workflow Scenarios

### Real-World Conversations with CTOs, CISOs, and Staff Engineers

> **For:** Richard Reyes
> **Purpose:** The Technical Screen Question Bank covers the fundamentals well, but real ADM conversations get granular fast. This supplement simulates the tactical, persona-specific questions you'll face — the ones that sound simple but reveal whether you actually understand how different stakeholders think, what they care about, and how AI tools fit (or don't fit) into their specific world.
> **How to use:** Each section is organized by *who you're talking to* and *where they sit on the adoption spectrum*. Practice each answer out loud. The "What makes this hard" note tells you why the question is tricky and what separates a good answer from a great one.

---

## Section 1: CTO & VP of Engineering Conversations

These are the people who own the budget, the org chart, and the engineering strategy. They think in terms of headcount, velocity, retention, and competitive advantage. They've heard a hundred vendor pitches. Your job is to be a thought partner, not a salesperson.

---

**Q1: "We already gave everyone Copilot licenses six months ago. Usage is at 25%. Why would I spend political capital switching to something else?"**

*What makes this hard:* You're not just selling Cursor — you're asking them to admit a previous decision didn't pan out, which no executive wants to do publicly.

*Approach:* Don't frame it as "Copilot failed." Frame it as "your team is ready for the next step." The 25% usage actually tells you something valuable: a quarter of their engineers are AI-receptive. Those are your champions. The question is why the other 75% didn't stick. Common reasons: Copilot is autocomplete-only, it doesn't understand the codebase holistically, there was no structured onboarding, and there's no team-level configuration.

Your pitch: "You've already done the hardest part — you've gotten engineers open to AI tools. The 25% who stuck with Copilot are your early adopters. What if we ran a 3-week side-by-side with 15 of those power users, letting them try Agent mode and codebase Q&A on their real work? If they don't see a meaningful difference, no harm done. But in my experience, the gap between autocomplete and autonomous multi-file work is where the 'aha moment' lives."

You're giving the CTO a low-risk path that doesn't require them to publicly reverse a decision. They can frame it internally as "evolving our AI strategy," not "replacing Copilot."

---

**Q2: "I need to justify this to my board. They want to see AI 'transforming' our engineering org. What does that actually look like in 6 months?"**

*What makes this hard:* Boards want big, clean narratives. Engineering productivity improvements are incremental and messy. You need to bridge the gap between boardroom language and engineering reality.

*Approach:* Build a narrative arc with three acts:

1. **Months 1–2: Foundation.** "We deployed Cursor to 50 engineers across 3 teams. Activation hit 80% by week 3. Developers reported saving 45–60 minutes per day on repetitive tasks — boilerplate, test writing, and codebase navigation."

2. **Months 3–4: Momentum.** "We expanded to 200 engineers. Internal champions started running peer workshops. Two teams reported shipping features a full sprint ahead of schedule. New hire onboarding time dropped from 6 weeks to 3, based on time-to-first-meaningful-PR."

3. **Months 5–6: Transformation.** "At scale, we're seeing a 20–25% reduction in cycle time across participating teams. Developer NPS for tooling increased by 18 points. We've standardized AI-assisted workflows through Cursor Rules, which means the productivity gains are consistent and measurable — not just anecdotal."

Then add the financial frame: "For a 200-person engineering org at $180K fully loaded cost per developer, a 15% productivity improvement is equivalent to $5.4M in recovered capacity — without adding headcount. The annual Cursor investment is roughly $96K."

The CTO can take that narrative directly to the board.

---

**Q3: "My VP of Platform says AI tools will create more technical debt, not less. She's seen junior engineers shipping AI-generated code they don't understand. How do you respond to that?"**

*What makes this hard:* The VP is raising a legitimate concern backed by real observations. You can't dismiss it without losing credibility.

*Approach:* Start by validating: "She's right to raise that — it's one of the most important adoption risks, and ignoring it is how organizations get burned. The question isn't whether AI-generated code should be reviewed; it's how to build the right guardrails so the tool creates less debt, not more."

Then get tactical:

- **Cursor Rules** — The VP of Platform can encode her team's architectural standards, naming conventions, and patterns directly into `.cursor/rules/`. Every AI suggestion follows those standards. This is how her expertise scales without her being a bottleneck.
- **Code review culture stays intact** — AI doesn't bypass pull requests. The same review process that catches bad human code catches bad AI code. Recommend adding an explicit review criterion: "Can the author explain every line of this PR?"
- **Start with seniors, not juniors** — A common mistake is deploying AI tools to junior engineers first. Start with staff and senior engineers who already have the judgment to evaluate AI output. Once they've established patterns and Rules, the tool becomes safer for everyone.
- **Plan Mode and checkpoints** — Agent mode has Plan Mode, which lets developers review the AI's intended approach before execution. This is the equivalent of an architect approving blueprints before construction starts.

The key: frame Cursor as a tool that *reduces* technical debt when deployed with the right guardrails, because it enforces consistency that manual processes can't match at scale.

---

**Q4: "We're in a hiring freeze. I can't add headcount, but we have a 6-month product roadmap that assumes 20% more capacity. Can Cursor actually close that gap?"**

*What makes this hard:* They're asking you to make a specific, quantifiable promise. Overpromise and you destroy trust. Underpromise and they don't buy.

*Approach:* Be honest about what "20% more capacity" means in practice: "Cursor won't magically create 20% more engineers. But it can recover a significant portion of the time your current engineers spend on work that isn't core feature development — boilerplate, tests, debugging, code navigation, and onboarding."

Then ground it in data: "Across enterprise deployments, developers consistently report saving 45–90 minutes per day. For a 100-person team, that's the equivalent of 12–18 additional engineers' worth of productive hours. Whether that fully closes a 20% capacity gap depends on where your bottlenecks actually are."

Offer a diagnostic: "What I'd want to do is interview 5–10 of your developers and map where their time actually goes. If 30% of their day is consumed by boilerplate, codebase navigation, and writing tests — which is typical — then yes, we can recover a meaningful chunk of that. If the bottleneck is something else entirely — like waiting on infrastructure or cross-team dependencies — then Cursor helps, but it's not the full answer. I'd rather give you an honest assessment than a convenient number."

This positions you as a strategic partner, not a vendor making promises.

---

**Q5: "We're acquiring a company next quarter. Their stack is completely different from ours — Ruby on Rails, we're Go and TypeScript. How does Cursor help with the integration?"**

*What makes this hard:* This is a highly specific, real-world scenario that tests whether you can think beyond standard rollout playbooks.

*Approach:* M&A code integration is one of the highest-value, most painful engineering challenges. Cursor helps in three specific ways:

1. **Codebase understanding** — Your Go engineers can use Cursor Chat with `@codebase` to interrogate the acquired Ruby codebase in natural language: "How does their authentication flow work?" "Where are the API endpoints defined?" "What ORM pattern are they using?" This cuts onboarding to the new codebase from weeks to days.

2. **Translation and migration** — When it's time to port functionality, Agent mode can help translate patterns between languages. "Take this Ruby service and rewrite it in Go, following our existing patterns" isn't a one-click operation, but it dramatically accelerates the manual rewrite.

3. **Shared Rules across stacks** — Even if the two codebases are different, you can establish shared Rules for the integration layer — API contracts, naming conventions, error-handling patterns — so that AI-generated code on both sides follows the same standards.

The sell: "M&A integration is exactly where AI tools pay for themselves fastest, because the alternative is senior engineers spending months reading unfamiliar code line by line."

---

**Q6: "My engineering org is 400 people across 8 time zones. How do you support a rollout that isn't US-centric?"**

*What makes this hard:* Most rollout playbooks assume co-located or single-timezone teams. Global deployments require thinking about async support, cultural differences in tool adoption, and varied working patterns.

*Approach:* A global rollout needs a regional champion model:

1. **Identify 2–3 champions per region** — These become the local points of contact. They run workshops in their time zone, answer questions in their language, and surface region-specific adoption challenges.

2. **Async-first enablement** — Recorded workshops, written playbooks, and async Slack channels become the primary support model. Live office hours should rotate across time zones — not just convenient for San Francisco.

3. **Localized quick wins** — The pain points may differ by region. A team in Bangalore doing heavy backend Java work has different needs than a frontend team in Berlin. Tailor the initial use cases to each region's actual workflow.

4. **Unified metrics, regional dashboards** — Track activation and feature adoption globally but report regionally. If adoption is 85% in the US but 40% in APAC, that tells you something specific about the APAC onboarding experience, not about the product.

5. **Cultural sensitivity** — Some engineering cultures are more hierarchical; adoption may need to be endorsed by local leadership, not just corporate mandate. Others are highly autonomous; they want to discover the tool themselves without mandated workshops.

---

## Section 2: CISO & Security Leadership Conversations

CISOs and security teams are paid to say no. Their job is risk reduction. They're not impressed by productivity gains — they want to know exactly where data goes, who has access, and what happens when things go wrong. Expect precise, technical questions delivered with skepticism.

---

**Q7: "Walk me through the exact data flow when a developer uses Cursor Chat. What leaves their machine, where does it go, who can see it, and how long is it retained?"**

*What makes this hard:* This requires specific technical knowledge about Cursor's data architecture. Vagueness here kills the deal.

*Approach:* Walk through the flow step by step:

1. **Developer types a question in Chat.** Cursor gathers context from open files, the codebase index, and any @-mentioned files.
2. **A prompt is constructed locally** on the developer's machine, combining their question with the relevant context.
3. **With Privacy Mode enabled**, that prompt is sent to the LLM provider (e.g., OpenAI, Anthropic) via Cursor's API — but the code is never stored on Cursor's servers, never logged, and never used for model training. The transmission is encrypted with TLS 1.2+ in transit.
4. **The LLM generates a response**, which is sent back to Cursor and rendered in the developer's editor.
5. **Nothing is retained.** With Privacy Mode on, the interaction is ephemeral — no conversation history is stored server-side.

Then add the compliance layer: "Cursor is SOC 2 Type 2 certified. Data at rest uses AES-256 encryption. For organizations that need even tighter control, there's a self-hosted option where the entire pipeline stays within your infrastructure. I'd recommend a call with our security team to walk through your specific threat model and map it against Cursor's architecture."

If there's something you're not 100% sure about, use the Honest Expert framework: "Let me confirm the exact retention policy with our security team and get you documentation by tomorrow." Never guess on data handling.

---

**Q8: "We're regulated under SOX and PCI-DSS. Our developers can't use tools that touch production data or have access to our secrets management system. How does Cursor handle that?"**

*What makes this hard:* Highly specific compliance frameworks. You need to know what Cursor does and doesn't touch.

*Approach:* Clarify what Cursor interacts with and what it doesn't:

- **Cursor operates on source code in the IDE.** It doesn't connect to production databases, secrets vaults, or CI/CD pipelines by default. It reads files on the developer's local machine and sends prompts to the LLM for inference.
- **MCP integrations** (Slack, Linear, etc.) are optional and configured by the admin. If the security team doesn't want Cursor connected to external tools, those integrations simply aren't enabled.
- **Secrets in code** — If developers have hardcoded secrets in their codebase (which is a separate problem), those could be included in context sent to the model. Privacy Mode ensures this data isn't stored, but the real mitigation is proper secrets management (environment variables, vault systems). Cursor Rules can include instructions like "Never include API keys or secrets in generated code."
- **Admin controls** — Cursor Business provides centralized admin controls that let security teams enforce Privacy Mode org-wide, restrict model selection, and monitor usage.

Then bridge: "I'd want to understand your specific compliance controls in detail. The best approach is a joint session with your security team and ours where we map Cursor's data handling against your SOX and PCI-DSS requirements line by line. We've done this with other regulated organizations — fintech, healthcare, government — and the outcome is usually a set of configuration guidelines that satisfy the compliance team."

---

**Q9: "What happens if Cursor has a data breach? What's in your incident response plan, and what's our exposure?"**

*What makes this hard:* A direct, adversarial question about worst-case scenarios. Most vendor reps deflect. Not deflecting builds enormous trust.

*Approach:* Don't dodge it. "That's the right question, and the answer has two parts: what's Cursor's exposure surface, and what's your organization's exposure."

1. **Cursor's exposure surface with Privacy Mode** — When Privacy Mode is enabled, Cursor doesn't store your code on its servers. The data in transit is a prompt (code context + question) sent to the LLM provider. If Cursor's infrastructure were compromised, the attacker wouldn't find a repository of your source code sitting on their servers — because it isn't there. The risk surface is limited to what's in memory during active inference, which is ephemeral.

2. **LLM provider risk** — The model providers (OpenAI, Anthropic) have their own security postures and SOC 2 certifications. With Privacy Mode, they receive the prompt for inference but don't retain it for training or logging.

3. **Incident response** — "I'd want to connect you with our security team to walk through our formal incident response plan, notification timelines, and the specific contractual commitments we make in our enterprise agreements. This is absolutely the kind of detail that should be in writing before you deploy."

The trust-building move: "Honestly, the organizations we work best with are the ones whose security teams push us hardest. It means you'll actually deploy with confidence."

---

**Q10: "Our policy is that no developer tool can send code outside our VPC. Full stop. What are your options?"**

*What makes this hard:* This is a hard constraint, not a negotiation point. You either have a solution or you don't.

*Approach:* Acknowledge the constraint directly: "That's a policy we see in highly regulated environments, and it's a legitimate requirement."

Then walk through the options:

- **Self-hosted deployment** — For organizations with strict data residency requirements, Cursor offers self-hosted options where the entire inference pipeline runs within the customer's infrastructure. This means code never leaves the VPC.
- **Bring-your-own-model** — Some organizations host their own LLMs (e.g., running a fine-tuned model on their own GPU infrastructure). Cursor can be configured to route to a custom model endpoint within the VPC.
- **Scoped pilot on non-sensitive code** — If the full self-hosted setup takes time to evaluate, a middle ground is running a pilot on a codebase that's already public or non-sensitive (open-source contributions, internal tools, documentation) while the self-hosted option is validated.

If the self-hosted option doesn't meet their exact specs, be honest: "Let me map your specific VPC requirements against our current self-hosted architecture and get you a precise answer on compatibility. I'd rather give you an accurate picture than a premature yes."

---

**Q11: "We had a security audit last quarter that flagged GitHub Copilot for telemetry data being sent to Microsoft. How do I know Cursor isn't doing the same thing?"**

*What makes this hard:* They're drawing a direct parallel to a past negative experience. You need to differentiate without badmouthing a competitor.

*Approach:* "That's a fair concern, and I appreciate the specificity. Let me walk you through exactly what Cursor does and doesn't transmit."

Be concrete:
- **Privacy Mode** eliminates code storage and training use. Unlike some tools where opting out of training doesn't necessarily eliminate all telemetry, Cursor's Privacy Mode is a comprehensive control.
- **Centralized admin enforcement** — The admin (your IT/security team) can enforce Privacy Mode at the organization level. Individual developers can't toggle it off.
- **Audit-ready** — Cursor provides documentation on exactly what data is transmitted and can work with your security team to validate the claims through a technical review.

Then the differentiator: "The audit concern you're describing — telemetry data sent without clear opt-out — is a configuration and transparency problem. Our approach is to make the data flow explicit, auditable, and centrally controlled. I'd recommend your security team run a network traffic analysis during the pilot to independently verify what's being transmitted. We welcome that kind of scrutiny."

---

## Section 3: Staff Engineer & Technical Lead Conversations

Staff and Principal engineers are the technical conscience of the organization. They've seen dozens of tools come and go. They don't care about your pitch — they care about whether the tool actually works in the messy reality of their codebase. Expect specific, hard-to-fake questions about real engineering workflows.

---

**Q12: "I spend 60% of my time reviewing PRs from 8 different developers. How does Cursor actually help me, specifically?"**

*What makes this hard:* This is a hyper-specific pain point. A generic "Cursor makes you more productive" answer won't land. They want to know how it changes *their* daily reality.

*Approach:* A Staff Engineer who spends 60% of their time on code review is a knowledge bottleneck — the org depends on their judgment for quality, and that dependency doesn't scale.

Cursor helps in three specific ways:

1. **Pre-review quality** — When the 8 developers on their team use Cursor with well-configured Rules, the code that arrives in PRs is more consistent, follows established patterns, and has fewer obvious issues. That means the Staff Engineer's review time is spent on meaningful architectural feedback — not catching style violations, missing error handling, or inconsistent naming.

2. **Bugbot** — Cursor's automated code review tool can catch common issues before the human reviewer even looks at the PR. It's like a first-pass filter that handles the mechanical checks, so the Staff Engineer can focus on the questions only a human can answer: "Is this the right approach? Does this fit our architecture?"

3. **Codebase Q&A for context** — When reviewing a PR that touches unfamiliar code, the Staff Engineer can use Chat with `@codebase` to quickly understand the context: "What does this module do? What calls this function?" Instead of manually tracing dependencies across 15 files, they get the context in seconds.

The reframe: "Your review time is some of the most expensive time in the organization. If we can reduce the low-value portion of that time by 40–50%, you get hours back every week for architecture, mentoring, and the deep technical work that only you can do."

---

**Q13: "Our codebase has 15 years of legacy code, three different architectural patterns, and a custom ORM nobody documented. Will Cursor just hallucinate garbage?"**

*What makes this hard:* This is a real, legitimate concern. Legacy codebases with custom tooling are exactly where AI tools struggle most.

*Approach:* Be honest upfront: "Legacy codebases with custom frameworks are genuinely harder for AI tools. I'm not going to pretend Cursor will understand your custom ORM out of the box the way it understands Django or SQLAlchemy."

Then explain what makes Cursor different:

1. **Codebase indexing** — Cursor indexes the *actual* codebase, including the custom ORM. It doesn't just rely on pre-training data. When a developer asks "how does our ORM handle transactions?", the answer comes from the actual source code, not from a generic pattern the model learned from open-source projects.

2. **Rules as institutional knowledge** — The team can create Rules that document the architectural patterns: "When writing database queries, use our custom ORM pattern defined in `lib/orm/base.py`. Never use raw SQL. Follow the transaction pattern in `docs/orm-patterns.md`." This bridges the gap between what the model knows from training and what's specific to this codebase.

3. **RAG over documentation** — If there's any internal documentation (even scattered), Cursor can reference it via `@docs` to ground its suggestions. And for the undocumented parts, Cursor Chat is actually a great tool for *creating* that documentation — "Explain how `lib/orm/base.py` works" is a conversation that can be turned into actual docs.

4. **Honest calibration** — "During a pilot, we'd want to specifically test against your legacy code. I'd recommend the first two weeks focus on understanding where Cursor performs well and where it doesn't in your environment. That gives us an honest picture, and it gives your Staff Engineers a chance to calibrate their trust."

---

**Q14: "I've been writing Go for 12 years. The AI keeps suggesting patterns from 3 versions ago. How do I make it stop?"**

*What makes this hard:* This is the kind of frustration that turns a senior engineer into a permanent skeptic. It's specific, experience-based, and the engineer is right to be annoyed.

*Approach:* "That's a common frustration with AI tools that rely purely on pre-training data, and it's valid. Here's how to fix it in Cursor."

Get tactical:

1. **Cursor Rules** — Create a rule that specifies the Go version and modern patterns: "We use Go 1.22+. Use structured logging with `slog`, not `log`. Use generics where appropriate. Follow the patterns in `internal/patterns/README.md`." Rules are loaded into every AI interaction, so outdated suggestions get suppressed.

2. **@docs for the Go standard library** — Point Cursor at the latest Go documentation using `@docs` with the current Go docs URL. This gives the model access to current API references instead of relying on training data cutoffs.

3. **Model selection** — Newer models (Claude 3.5/4, GPT-4o) have more recent training data. If the engineer is using an older model, switching may immediately reduce the frequency of outdated suggestions.

4. **Feedback through usage** — When the AI suggests an outdated pattern, the developer can reject it and the suggestion quality improves over the session as the context accumulates.

The bridge: "The engineers who get the most out of Cursor are the ones who invest 20 minutes configuring Rules specific to their stack. For someone with your depth of Go expertise, you could set up Rules in a single sitting that would prevent 90% of those outdated suggestions — and those Rules would benefit every engineer on your team."

---

**Q15: "We have a monorepo with 4 million lines of code. Agent mode tries to make changes across the entire repo and creates chaos. What am I missing?"**

*What makes this hard:* Monorepo management is a real engineering challenge. If Cursor doesn't handle it well, the tool creates more work, not less.

*Approach:* The issue is almost always about scoping context, not about the tool itself:

1. **Use @-mentions to constrain context** — Instead of letting Agent mode operate on the full monorepo, scope requests to specific directories or files: "@folder:services/payments Build a new endpoint for refund processing." This tells the agent exactly where to work.

2. **Cursor Rules for monorepo boundaries** — Create Rules that define the monorepo structure: "This is a monorepo. The `services/` directory contains independent microservices. Never modify code in `services/auth` when working on `services/payments`. Shared utilities live in `libs/common/`." This gives the AI architectural awareness.

3. **Workspace-level configuration** — Cursor's indexing can be configured to prioritize specific directories. For a 4M-line monorepo, the team should configure which parts are indexed and how they're prioritized.

4. **Smaller, scoped tasks** — Agent mode works best with specific, well-bounded tasks. "Build a refund endpoint in the payments service with tests" is much better than "Add refund support across the platform."

The honesty: "Monorepos at that scale push the boundaries of any AI tool's context management. I'd want to work with your team during the pilot to find the right configuration — and I'd be upfront that some workflows may need to be scoped differently than with a smaller codebase."

---

**Q16: "My team writes Rust. AI tools are notoriously bad at Rust because of the borrow checker and type system. Convince me."**

*What makes this hard:* The engineer is technically correct — Rust's strict type system and ownership model are genuinely harder for LLMs. You can't bluff your way through this.

*Approach:* Acknowledge the reality first: "You're right that Rust's type system is one of the harder languages for AI tools. The borrow checker, lifetime annotations, and trait system create constraints that LLMs don't always get right on the first pass."

Then reframe where the value actually lives for Rust developers:

1. **Boilerplate and scaffolding** — Even in Rust, there's significant boilerplate: struct definitions, trait implementations, error types, `From`/`Into` conversions, builder patterns. Tab completion and Cmd+K handle these well because the patterns are well-established.

2. **Test generation** — Rust's testing infrastructure is excellent, and generating test scaffolding — `#[test]` functions, assertion patterns, mock setups — is something AI handles reliably. The developer still needs to verify the logic, but the scaffolding saves significant time.

3. **Codebase Q&A** — "What does this trait bound mean?" "How is this generic type used across the codebase?" For navigating complex Rust codebases, Chat is genuinely useful regardless of how well the AI writes Rust.

4. **Documentation** — Generating doc comments for Rust functions, including usage examples, is high-value and low-risk.

5. **Honest calibration** — "I'd suggest your team start with Tab completion and Chat for codebase navigation. The test is whether those alone save enough time to justify the tool. For complex ownership-related code generation, the AI will need more iteration — but even there, generating a first draft that a Rust expert then fixes is often faster than writing from scratch."

---

## Section 4: AI-Forward Teams — Maximizing Value

These teams have already bought into AI. They're past the "should we use this?" question and deep into "how do we use this better?" The conversations here are about optimization, scaling, and advanced workflows.

---

**Q17: "We're already heavy Cursor users — 90% weekly active. What's the next level? How do we go from good to great?"**

*What makes this hard:* Most ADM conversations are about getting teams to adopt. This one is about depth, and generic answers won't work.

*Approach:* Move the conversation up the value chain:

1. **Automations and Cloud Agents** — If the team is mostly using Tab and Chat, introduce background agents that can handle automated tasks: "Set up Automations so that when a PR is opened, a Cloud Agent reviews it, suggests improvements, and flags potential issues — before a human reviewer even looks at it." This extends AI from an interactive tool to an autonomous workflow layer.

2. **MCP integrations** — Connect Cursor to their existing tools. If they use Linear for project management, set up the MCP integration so agents can read tickets, understand requirements, and create PRs that reference the original issue. Sentry integration means the agent can read error logs and propose fixes. This moves Cursor from "code editor" to "engineering workflow platform."

3. **Advanced Rules** — Move beyond basic coding standards. Create Rules that encode architectural decisions: "When adding a new API endpoint, always include: input validation, rate limiting, error response formatting per our API spec, and a corresponding integration test." These Rules make the AI a codified version of the team's best practices.

4. **Custom prompt libraries** — Help the team build a shared library of prompt templates for common tasks: migration scripts, database schema changes, API versioning patterns. New team members inherit the team's collective prompt expertise.

5. **Metrics maturity** — Move from "are people using it?" to "what's the quality delta?" Track acceptance rate trends, time-to-resolution for bugs, and the correlation between AI-assisted PRs and review cycle time.

---

**Q18: "Our most productive engineer uses Cursor differently than everyone else. She uses Agent mode for everything, including things I'd think are too complex. Should we make everyone work that way?"**

*What makes this hard:* There's an implicit assumption that one power user's workflow should be universalized. That rarely works.

*Approach:* "That's a great instinct, but I'd be cautious about mandating one person's workflow for the whole team."

Why:
- **Different engineers have different trust levels with AI.** The trust gradient is real. Some developers are naturally comfortable delegating complex tasks to Agent mode; others need to see and control every line. Both can be highly productive.
- **The power user's approach works because of her expertise.** She likely has strong judgment about when Agent mode's output is correct and when it needs correction. A less experienced engineer using the same approach might accept incorrect output because they can't evaluate it as effectively.

What to do instead:
- **Document her workflows** — Have her create short recordings or write-ups of her 5 most common Agent mode patterns. Share these as "advanced tips," not mandates.
- **Pair sessions** — Have her run a workshop where she live-demos her workflow on a real task. Let other engineers watch, ask questions, and try it themselves.
- **Create progressive challenges** — "This week, try using Agent mode for one task you'd normally do manually. Share what happened." Voluntary, low-pressure experimentation.

The principle: "The best adoption programs create the conditions for developers to discover their own optimal workflow, not copy someone else's."

---

**Q19: "We want to use Cursor to enforce our architectural standards automatically. Not just suggest — enforce. Is that possible?"**

*What makes this hard:* There's a line between guidance and enforcement, and the answer involves nuance about what Rules can and can't do.

*Approach:* "Rules can get you most of the way there, but 'enforce' is a strong word — let me be precise about what's possible."

What Rules can do:
- Instruct the AI to always follow specific patterns, libraries, and conventions when generating code. If the Rule says "Always use our custom error handler from `lib/errors`," Agent mode will follow that instruction consistently.
- Include references to documentation and example files, so the AI always has the canonical pattern available.
- Rules are version-controlled in Git, so they're reviewed and approved like any other code change.

What Rules can't do:
- Rules guide AI-generated code, but they don't physically prevent a developer from writing non-compliant code manually. They're not a linter or a CI check.
- For true enforcement, combine Rules with existing tooling: linters (ESLint, golangci-lint), CI checks, and automated code review. Cursor + linting + CI creates a layered system where AI generates compliant code, linters catch anything that slips through, and CI blocks non-compliant merges.

The recommendation: "Think of Rules as the proactive layer — they prevent non-compliant code from being generated in the first place — and your existing linting/CI pipeline as the reactive layer that catches anything the AI or developer misses. Together, they're far more effective than either alone."

---

## Section 5: AI-Hesitant & Resistant Teams — Building Trust from Zero

These teams range from cautiously skeptical to actively hostile. Some have been burned by AI hype before. Some have legitimate security concerns. Some have a culture that prizes manual craftsmanship. Forcing adoption will backfire. Your job is to find the smallest possible entry point that demonstrates undeniable value.

---

**Q20: "My Staff Engineer says she won't use any tool that sends code to a third-party server. She's not wrong to be cautious. But she's also blocking adoption for 40 people. How do you handle this?"**

*What makes this hard:* A respected technical leader blocking adoption is the hardest organizational challenge. You can't go around them without creating resentment.

*Approach:* "Don't go around her. Go through her. She's exactly the person you need on your side."

Step 1: **Meet with her 1:1.** Not a pitch meeting — a listening session. Ask her to walk you through her specific concerns. Is it data residency? Training data exposure? Trust in the model providers? Each concern has a different solution.

Step 2: **Address each concern with specifics.** If it's data leaving the machine — walk through Privacy Mode in detail. If it's training data — confirm zero training use. If it's the model providers themselves — discuss the self-hosted option or bring-your-own-model. Let her validate the claims independently.

Step 3: **Give her control.** "Would you be willing to design the security guardrails for the pilot? You'd define which codebases are in scope, which Privacy Mode settings are required, and what the acceptable use policy looks like." This transforms her from a blocker into the architect of the rollout. Her stamp of approval carries more weight with the other 40 engineers than any demo you could run.

Step 4: **Start with her lowest-risk use case.** Maybe it's using Cursor Chat to generate documentation for an internal tool. Maybe it's Tab completion on a non-sensitive codebase. Find the one use case she'd accept and let her experience it on her own terms.

The principle: "The strongest skeptics often become the strongest advocates — but only if they feel like they chose to adopt, not that it was imposed on them."

---

**Q21: "We tried Copilot two years ago. Three engineers had their generated code introduce vulnerabilities that got caught in a security audit. Management banned AI tools. How do you reopen that conversation?"**

*What makes this hard:* There's organizational trauma here. A ban was enacted for a real reason. You're asking them to reverse a decision that was made to protect the company.

*Approach:* "I wouldn't ask them to reverse the ban. I'd ask them to revisit the conditions under which AI tools could be safe."

Frame the conversation around what's changed in two years:
- **AI tool maturity** — The tools in 2024 are fundamentally different from today. Context awareness, Rules, Privacy Mode, and enterprise admin controls didn't exist in the same form.
- **Industry shift** — 64% of the Fortune 500 are now using Cursor. The risk calculus has shifted: the risk of *not* adopting is now a competitive concern, not just a convenience trade-off.
- **Guardrails that didn't exist before** — Cursor Rules can include explicit security instructions: "Never generate code that handles user input without validation." "Always use parameterized queries, never raw SQL." These rules would have prevented the exact vulnerabilities they experienced.

The approach:
1. Request a meeting with the person who enacted the ban — usually the CISO or CTO. Come with the specific vulnerabilities that were introduced (if known) and show how Cursor's guardrails address each one.
2. Propose a security-first pilot: Privacy Mode enforced, Rules configured by the security team, scope limited to a non-sensitive internal tool, and a post-pilot security audit to validate that no new vulnerabilities were introduced.
3. Make the security team the hero: "Your security team caught the issues last time — that's proof the process works. Let's design a pilot that gives them even more control and visibility."

---

**Q22: "Half my team is in their 50s. They've been writing Java since 1.2. They think AI coding tools are a fad. What's your play?"**

*What makes this hard:* You're dealing with deeply experienced engineers whose skepticism isn't irrational — it's based on decades of watching tools come and go. Patronizing them or implying they need to "get with the times" will permanently alienate them.

*Approach:* "I'd start by respecting the hell out of their experience, because those engineers have something AI will never have — decades of institutional knowledge about why things are built the way they are."

Then find the angle that resonates with *their* pain points:

1. **Boilerplate is boilerplate at any experience level.** Even the most seasoned Java developer writes the same getter/setter patterns, Spring Boot configurations, and JUnit test scaffolding hundreds of times. Tab completion eliminates that tedium without asking them to change anything about how they think or work.

2. **Knowledge capture** — These are the engineers whose knowledge is the hardest to replace. If they encode their expertise into Cursor Rules — "When writing a service class, follow the pattern in `core/services/BaseService.java`" — their standards persist across the organization even after they retire.

3. **The right entry point** — Don't start with Agent mode or flashy demos. Start with the most boring, unobjectionable use case: "Try Tab completion for a week. If it doesn't save you any time, turn it off." The bar is so low it's hard to refuse.

4. **Peer influence over external pressure** — If even one veteran engineer has a positive experience, their endorsement carries 10x the weight of any presentation from Cursor or management.

What not to do:
- Don't imply they're falling behind.
- Don't lead with productivity metrics (they'll interpret it as "we think you're slow").
- Don't make it mandatory (they'll comply minimally and never engage).

---

**Q23: "Our engineers are convinced AI tools will be used to measure their productivity and eventually replace them. How do you address that fear?"**

*What makes this hard:* This isn't a technical objection — it's an existential fear. No amount of feature demos addresses it.

*Approach:* Take the fear seriously. "That concern comes from a real place, and dismissing it would be a mistake."

Address it on two levels:

**Level 1: The factual response.** Cursor's usage analytics are designed for organizational health, not individual surveillance. The metrics track activation rates, feature adoption, and aggregate trends — not "Developer A wrote X lines today." The purpose is to understand whether the tool is being adopted and where enablement is needed, not to create a developer leaderboard.

**Level 2: The cultural response.** "The way leadership talks about AI tool deployment sets the tone for the entire organization. If the CTO frames it as 'we're measuring your output,' engineers will resist. If the CTO frames it as 'we're investing in tools that eliminate the tedious parts of your job so you can do more meaningful work,' the reception is completely different."

Recommend that leadership:
- Communicate explicitly that AI tool usage data will not be used in performance reviews.
- Frame Cursor as a benefit, like upgrading a laptop — not a performance management tool.
- Have engineering managers model the behavior: use Cursor themselves, share what they learn, acknowledge what doesn't work.

Then the macro argument: "Every major wave of developer tooling — IDEs, version control, CI/CD, cloud infrastructure — was initially met with fear that it would reduce the need for developers. In every case, the opposite happened: the tools raised the floor of what one developer could accomplish, which made developers *more* valuable, not less. The organizations that adopted earliest had the biggest advantage."

---

**Q24: "I lead a team of embedded systems engineers writing C for IoT devices. We don't use VS Code. We don't use cloud infrastructure. Our build system is custom. Is Cursor even relevant for us?"**

*What makes this hard:* This is a legitimate edge case. Not every team is a natural fit, and pretending otherwise destroys credibility.

*Approach:* Be honest about the fit: "I want to be straight with you — your team is not the typical early adopter for Cursor, and I wouldn't recommend starting here in an enterprise rollout."

Why:
- Cursor is VS Code-based, and embedded teams often use specialized IDEs (IAR, Keil, Eclipse CDT) with hardware-specific tooling.
- C for embedded systems with custom build toolchains is an area where AI suggestions need to be tightly constrained — wrong code can brick a device.
- The value proposition is strongest where there's high boilerplate, codebase navigation complexity, and test writing overhead. Embedded C teams often have a different ratio.

Where Cursor *might* still help:
- **Codebase documentation** — If the embedded codebase is poorly documented (they usually are), Cursor Chat can help engineers ask questions about the code and generate documentation.
- **Test scaffolding** — If the team writes unit tests (even for embedded), AI can scaffold test files and assert patterns.
- **Companion tooling** — If the embedded team also maintains any Python scripts, CI configuration, or cloud-side code, those are natural entry points.

The key message: "I'd rather tell you where Cursor fits and where it doesn't than oversell and erode your trust. For your org, the embedded team might be Phase 3, not Phase 1."

---

## Section 6: Mixed-Maturity Organizations — Navigating the Spectrum

Most large organizations aren't uniformly AI-forward or AI-hesitant. They have frontend teams that love AI, backend teams that are cautious, security teams that are hostile, and data teams that are already building their own tools. Your job is to navigate this spectrum simultaneously.

---

**Q25: "My frontend team wants Agent mode for everything. My backend team says Tab completion is fine. My platform team refuses to use AI at all. How do you run one rollout across all three?"**

*What makes this hard:* A one-size-fits-all approach will fail. Too much customization won't scale.

*Approach:* "You don't run one rollout — you run three coordinated rollouts with a shared framework."

**Shared framework:**
- Same Cursor Business workspace with org-level admin controls (Privacy Mode, model selection).
- Shared baseline metrics (WAU, feature adoption) reported in a single dashboard.
- Shared Slack channel for cross-team learning.

**Team-specific strategies:**

*Frontend team (AI-forward):* They're your accelerators. Give them advanced onboarding: MCP integrations with Figma, Agent mode for component scaffolding, Rules that enforce their design system. Use their success stories as internal proof points.

*Backend team (pragmatic):* Start with Tab completion and Chat for codebase Q&A — respect their boundary. After 2–3 weeks, introduce targeted use cases: "Try using Agent mode for your next test file." Let them expand at their own pace. Track acceptance rates to show them their own positive trend.

*Platform team (resistant):* Apply the Q20 approach. Meet with the tech lead 1:1. Understand the specific objections. Find the one use case they'd accept (documentation, internal tooling, non-production code). Don't force it.

**The connecting tissue:** Monthly cross-team demos where teams share what they've learned. The frontend team's enthusiasm creates social proof. The backend team's measured approach validates that it's not just hype. And the platform team gets exposure without pressure.

---

**Q26: "We have 50 engineers in SF and 150 contractors offshore. The contractors work on a separate codebase. Should they get Cursor too?"**

*What makes this hard:* Contractor teams introduce licensing complexity, security considerations (contractor access to IP), and potentially different quality standards.

*Approach:* This is a business decision with technical implications. Walk through the considerations:

**Case for including contractors:**
- If they're writing production code, the quality and consistency benefits of Cursor Rules apply to them too — arguably more, since contractors may be less familiar with the codebase's conventions.
- Codebase Q&A dramatically accelerates contractor onboarding, which is often a recurring cost (contractors rotate more frequently).
- The ROI math applies equally: if a contractor costs $80/hour and Cursor saves them 45 minutes/day, that's $60/day in recovered value versus $1.33/day in Cursor licensing.

**Considerations:**
- **Security** — Does the organization want contractors' code flowing through Cursor's pipeline? Privacy Mode applies the same way, but the CISO may want different policies for contractor versus employee access.
- **Licensing** — Cursor Business licensing is per-seat. The CTO needs to decide if the productivity gain justifies the cost for the contractor pool, especially if contractors rotate frequently.
- **Separate codebase** — If the contractor codebase is truly separate, they'd need their own Cursor Rules configured for their patterns. This is additional setup effort.

**Recommendation:** "I'd include contractors in Phase 2, after the pilot with your core team validates the playbook. That way you have an established onboarding process, proven Rules, and usage data to justify the additional licenses. It also gives your security team time to define contractor-specific policies."

---

**Q27: "Our data science team uses Jupyter notebooks, not traditional code files. Our ML engineers use PyCharm. Our DevOps team lives in the terminal. How does Cursor fit into a polyglot tooling environment?"**

*What makes this hard:* Cursor is an IDE — not every engineering workflow is IDE-centric. You need to be honest about where the product fits and where it doesn't.

*Approach:* Segment by workflow:

**Data science (Jupyter notebooks):** Cursor supports Jupyter notebooks natively. Data scientists can use Chat to explain complex data transformations, generate visualizations, and debug pandas/numpy code. Agent mode can scaffold entire notebook workflows. This is actually a strong use case because data science involves a lot of boilerplate (data loading, cleaning, feature engineering).

**ML engineers (PyCharm):** With Cursor's ACP (Agent Client Protocol) extending to JetBrains IDEs, ML engineers using PyCharm can access Cursor's AI capabilities without switching editors. Validate the ACP experience for their specific PyCharm workflows during the pilot.

**DevOps (terminal-centric):** This is where Cursor's fit is less obvious for workflow reasons, but still valuable:
- Infrastructure as code (Terraform, Ansible, CloudFormation) is heavily boilerplate — Cursor excels here.
- DevOps engineers who write CI/CD pipelines, Dockerfiles, and Kubernetes manifests benefit from Tab completion and Agent mode.
- The terminal-within-Cursor gives them their familiar environment with AI augmentation.

**The honest positioning:** "Cursor isn't going to replace every tool in every engineer's workflow. The goal is to identify the workflows where it adds the most value for each team and start there. For your org, data science and infrastructure-as-code are probably the strongest initial fits alongside your core application development."

---

**Q28: "We're an AI-first company. We build ML models. Our engineers are more technical than most Cursor users. What does an ADM even do for us?"**

*What makes this hard:* The customer might genuinely be more technically sophisticated than the average enterprise account. The default ADM playbook may feel patronizing.

*Approach:* "For a team like yours, my role shifts from 'help you understand AI tools' to 'help you operationalize them at scale.'"

What an ADM does for a technically sophisticated org:

1. **Configuration at scale** — Your individual engineers might know exactly how to use Cursor. The challenge is: do all 200 of them use it consistently? Are Rules standardized? Is the team getting the full value from MCP integrations, Automations, and Cloud Agents?

2. **Cross-team coordination** — Even in AI-first companies, different teams use tools differently. The ADM identifies best practices from your most effective teams and helps propagate them to others.

3. **Executive reporting and ROI** — Your engineers don't want to spend time building dashboards for the CFO. The ADM handles the business case: usage analytics, productivity metrics, renewal justification — the operational layer that technical teams shouldn't have to think about.

4. **Product feedback loop** — An AI-first company likely pushes Cursor harder than most customers and hits edge cases faster. The ADM is your direct line to Cursor's product team, ensuring your feedback shapes the roadmap.

5. **Scaling what works** — The ADM's job is to take what your best engineers are doing with Cursor and make it reproducible across the organization — through workshops, Rules, prompt libraries, and documentation.

The reframe: "The ADM for a technically sophisticated org isn't a teacher — they're an operations multiplier."

---

## Section 7: How to Practice These

1. **Role-play by persona.** Pick a persona (CTO, CISO, Staff Engineer) and answer 3–4 questions from their section in sequence, as if it's a continuous conversation. The follow-up questions in real life are harder than the first question.

2. **Practice the "I don't know" moments.** For Q7 (data flow) and Q8 (compliance specifics), deliberately practice the Honest Expert framework. The interviewer may test your reaction to a question you can't fully answer.

3. **Stack two personas.** Real meetings often have a CTO and a Staff Engineer in the same room. Practice answering Q3 (CTO concern about tech debt) and then immediately pivoting to Q13 (Staff Engineer's legacy codebase concern) — the tone and vocabulary need to shift.

4. **Time yourself.** These tactical questions demand concise answers. 90 seconds for a direct question. 2 minutes max for a scenario. If you're going longer, you're losing them.

5. **Record and listen.** Record yourself answering Q20 (the Staff Engineer blocking adoption) or Q21 (the AI tool ban). Listen for: Do you sound empathetic or defensive? Are you concrete or hand-wavy? Would a skeptic trust you after hearing this?

6. **The Adoption Spectrum drill.** Take one product capability (e.g., Agent mode) and practice positioning it three ways:
   - To an AI-forward team that wants to go deeper
   - To a pragmatic team that needs to see proof
   - To a resistant team that needs to feel safe
   
   The feature is the same. The framing changes completely.

---

*Last updated: March 30, 2026*
*These are the conversations that separate a good ADM from a great one. The existing question bank gives you the foundation — this one gives you the edge.*

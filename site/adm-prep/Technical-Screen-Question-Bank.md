# Technical Screen — Question Bank

### Probable Questions for the AI Deployment Manager Technical Screen at Cursor

> **For:** Richard Reyes
> **Purpose:** Go beyond the study guide's polished answers. These questions simulate the real-time thinking a technical screen demands — ambiguous scenarios, product edge cases, metric reasoning, and curveballs.
> **How to use:** Practice each question out loud. Time yourself (aim for 90–120 seconds per answer). The "What they're testing" notes tell you what to emphasize.

---

## Section 1: Product Depth & Technical Fluency

These questions test whether you actually understand the product or just memorized talking points.

---

**Q1: "Walk me through what happens — technically — when a developer types a question in Cursor Chat and hits Enter."**

*What they're testing:* Can you explain the LLM pipeline (context gathering → prompt construction → model inference → output rendering) in a way that's accurate without being an engineer? Do you understand codebase indexing and RAG?

*Approach:* Walk through the four-step pipeline. Mention that Cursor gathers context from open files, recent edits, @-mentions, and the codebase index. It constructs a prompt that includes that context plus the question. It routes to the best model (or the one the user/admin selected). The model generates a response, and Cursor renders it in the chat panel. Emphasize that the context-gathering step is Cursor's key differentiator — it's why the answer is grounded in the developer's actual project.

---

**Q2: "A customer asks: 'Why should I pay for Cursor when my developers already use ChatGPT for free?' What do you say?"**

*What they're testing:* Can you articulate Cursor's value prop versus standalone LLMs without being dismissive?

*Approach:* Acknowledge ChatGPT is a great general-purpose tool. Then draw the contrast: ChatGPT doesn't know the customer's codebase — developers have to manually copy/paste code and explain context every time. Cursor sees the entire project, applies team-specific Rules, and can take action (edit files, run tests). It's the difference between asking a stranger for advice versus working with a colleague who's read your whole codebase. Frame it in productivity terms: the context-switching cost of toggling between ChatGPT and the editor adds up to hours per week.

---

**Q3: "Explain the difference between Tab, Chat, Cmd+K, and Agent mode. When would a developer use each one?"**

*What they're testing:* Do you understand the product surfaces at a workflow level, not just a feature-list level?

*Approach:* Map each to the trust gradient and use concrete scenarios:
- **Tab** — Writing code and want the next few lines predicted automatically. Zero effort, passive. Example: typing a function signature and Tab fills in the body.
- **Chat** — Need to ask a question or get an explanation. "How does our auth flow work?" Example: onboarding to an unfamiliar part of the codebase.
- **Cmd+K** — Have existing code and want to transform it with a natural-language instruction. Example: selecting a function and saying "add input validation."
- **Agent** — Need something built end-to-end across multiple files. Example: "Build a REST endpoint for user profiles with tests and documentation."

---

**Q4: "What is MCP, and why does it matter for enterprise customers?"**

*What they're testing:* Do you understand Cursor's integration story beyond the editor?

*Approach:* MCP (Model Context Protocol) is an open standard that lets Cursor's agents connect to external tools — Slack, Datadog, Sentry, Linear, Figma, databases. Think of it as a universal adapter. For enterprises, it means the AI isn't siloed in the code editor — it can read a bug report from Linear, look up the error in Datadog, find the relevant code, fix it, and open a PR. This makes Cursor part of the broader engineering workflow, not just a code-writing tool.

---

**Q5: "A CTO says, 'We have millions of lines of code. Can Cursor actually handle that?' How do you respond?"**

*What they're testing:* Do you understand codebase indexing, context windows, and how Cursor manages scale?

*Approach:* Acknowledge the concern is valid — context windows have limits. Then explain how Cursor handles it: codebase indexing creates a searchable semantic map of the entire project, and RAG pulls only the most relevant files into each prompt. The AI doesn't need to "see" all millions of lines at once — it retrieves the right context for the specific question. Also mention secure codebase indexing at scale, where teammates can reuse existing indexes so time-to-first-query drops from hours to seconds. Offer to validate during a pilot on their actual repo.

---

**Q6: "What are Cursor Rules, and how would you help an enterprise team set them up?"**

*What they're testing:* Do you understand the operational side of the product — the part you'd actually help customers with?

*Approach:* Rules are Markdown files in `.cursor/rules/` that give the AI persistent instructions — coding standards, architectural patterns, preferred libraries, naming conventions. They're version-controlled in Git, so the whole team shares the same standards. During a rollout, you'd work with tech leads to define Rules that reflect their existing code review standards: "Use TypeScript strict mode," "API routes go in `app/api/`," "Follow our error-handling pattern in `utils/errors.ts`." This is how you scale consistency across hundreds of developers. Without Rules, every developer gets slightly different AI output.

---

**Q7: "What's a hallucination in the context of AI coding tools, and how should teams think about it?"**

*What they're testing:* Can you talk honestly about a real limitation without undermining the product?

*Approach:* A hallucination is when the AI confidently generates code that looks correct but is subtly wrong — maybe it references an API that doesn't exist, or it uses a deprecated pattern. It's a real risk. The right framing: AI output should always be reviewed, just like any code — including code from a human colleague. Cursor mitigates this through deep context awareness (grounding responses in the actual codebase via RAG), Rules (enforcing correct patterns), and the human-in-the-loop model (developers review and approve changes). The message to teams: "Cursor is a power tool, not autopilot."

---

## Section 2: Deployment Scenarios & Strategy

These questions test your ability to think through real-world deployment problems — the core of the ADM role.

---

**Q8: "You land a new enterprise account with 800 engineers. It's week one. What do you do?"**

*What they're testing:* Do you have a structured approach, or will you wing it?

*Approach:* Phase 0 — Discovery. Meet engineering leadership (CTO, VPs, Directors). Interview 5–10 developers across different teams and seniority levels. Map the tech stack, existing AI tool usage, security/compliance requirements, and the internal decision-making process. The deliverable is an assessment doc that recommends a rollout approach tailored to their situation. Do not propose a pilot until you understand the organization. Key questions: "What does your development workflow look like end-to-end?" "Where do developers spend time that isn't building features?" "What are your security requirements?"

---

**Q9: "You're running a pilot with 20 developers. After 3 weeks, only 8 are actively using Cursor. What do you do?"**

*What they're testing:* Can you diagnose an adoption problem and take action?

*Approach:* First, diagnose. Talk to the 12 who aren't using it — is it friction (setup issues, slow performance)? Is it workflow mismatch (they use JetBrains, not VS Code)? Is it skepticism ("I tried it once, the suggestion was wrong")? Is it simply forgetting (they default to old habits)? Then act based on what you find:
- If friction → fix the technical blocker immediately
- If skepticism → schedule 1:1 working sessions using their real code, targeting their specific pain point
- If habit → introduce a low-effort entry point (Tab only, no workflow change) and share peer results from the 8 active users
- If workflow mismatch → check if JetBrains support (via ACP) resolves the issue

Also look at the 8 active users: what features are they using? What wins have they had? Turn those into internal case studies.

---

**Q10: "The CISO (Chief Information Security Officer) blocks the rollout because they're concerned about code leaving the network. How do you handle it?"**

*What they're testing:* Can you navigate a cross-functional blocker with the right level of technical specificity?

*Approach:* This is the most common enterprise blocker. Don't fight it — treat it as a legitimate concern. Walk the CISO through Privacy Mode: when enabled, code is never stored on Cursor's servers and never used for model training. Cursor is SOC 2 Type 2 certified, with zero data retention, AES-256 encryption at rest, and TLS 1.2+ in transit. Offer to set up a call between the CISO and Cursor's security team. Provide documentation (security whitepaper, compliance certifications). If they need a deeper review, offer a controlled pilot with Privacy Mode enforced and usage confined to non-sensitive code. The key: treat security as a gate to open, not an objection to overcome.

---

**Q11: "A team that completed your pilot says, 'We liked it, but we can't prove ROI to our CFO.' How do you help them?"**

*What they're testing:* Can you build a business case, not just a product pitch?

*Approach:* Start with what they do have: pilot usage data (active users, features used, acceptance rate). Then build the story:
1. **Time savings** — Survey pilot developers: "How much time does Cursor save you per day?" Even a conservative 45 minutes/day is meaningful.
2. **The math** — Number of developers × average fully-loaded cost × time savings percentage = recovered productivity value. Compare that to the Cursor license cost (~$40/user/month).
3. **Qualitative wins** — Onboarding speed, developer satisfaction, reduced interruptions (fewer "How does X work?" questions to colleagues).
4. **Risk framing** — "If your competitors are adopting AI coding tools and you're not, you're accepting a growing productivity gap."

Offer to co-build the business case document with the champion.

---

**Q12: "How would you handle a rollout at a company that's 70% Java (JetBrains) and 30% Python/TypeScript (VS Code)?"**

*What they're testing:* Do you know the product's real-world constraints and can you adapt?

*Approach:* Historically, the JetBrains/VS Code split was a real barrier — Cursor was VS Code-only. As of March 2026, Cursor now works inside JetBrains IDEs through the Agent Client Protocol (ACP). This changes the conversation: Java teams no longer have to switch editors. The strategy: start the pilot with the Python/TypeScript teams (lowest friction, natural fit), but run a parallel small group with JetBrains users to validate the ACP experience. Use the early wins from the VS Code group to build momentum, then expand to the full Java org once the JetBrains experience is validated.

---

**Q13: "You're managing 15 enterprise accounts simultaneously. How do you prioritize your time?"**

*What they're testing:* Operational discipline. Can you scale yourself?

*Approach:* Segment accounts by deployment stage and risk:
- **Red** — Accounts with stalled adoption, upcoming renewals, or active blockers. These get daily attention.
- **Yellow** — Accounts mid-rollout, progressing but needing guidance. Weekly check-ins.
- **Green** — Accounts with strong adoption and internal champions. Biweekly or monthly strategic check-ins.

Within each week, prioritize: (1) unblock anything that's stalled, (2) advance pilots toward expansion, (3) nurture green accounts toward case studies and referrals. Use leading indicators (activation rate, feature adoption) as an early warning system — don't wait for a renewal conversation to discover adoption is low.

---

**Q14: "A competitor (Copilot) drops their price to $10/user/month. Three of your accounts bring it up. What do you do?"**

*What they're testing:* Can you sell on value, not price?

*Approach:* Don't panic and don't trash the competitor. Acknowledge the price difference, then reframe: "The question isn't what the tool costs — it's what it's worth." Walk through the value gap:
- Copilot at $10/month gives you autocomplete. Cursor at $40/month gives you Agent mode, Cloud Agents, Automations, Bugbot, MCP integrations, Rules, team-level analytics, and enterprise admin controls.
- A developer making $180K/year costs $90/hour. If Cursor saves even 15 minutes more per day than Copilot, that's $45/day in recovered productivity — more than the monthly cost difference.
- Ask the account: "Which capabilities are driving value for your team right now?" If the answer involves Agent mode, codebase Q&A, or Rules, those simply don't exist in Copilot.

---

## Section 3: Metrics & Analytical Thinking

These questions test whether you can reason with data, not just recite metric names.

---

**Q15: "If you could only track three metrics during a pilot, which three and why?"**

*What they're testing:* Do you understand which signals matter most, and can you prioritize?

*Approach:*
1. **Weekly active users (WAU)** — Are people actually using it? This is the foundation. If activation is low, nothing else matters.
2. **Feature depth** — Are developers using Tab only, or are they also using Chat and Agent? Moving up the trust gradient signals deepening value.
3. **Self-reported time saved** — A quick weekly pulse survey ("How much time did Cursor save you this week?"). This is the bridge to ROI and gives you qualitative color alongside the quantitative data.

Why not PRs merged or cycle time? Those are lagging indicators that take months to show. In a 4-week pilot, you need leading indicators that tell you the story *now*.

---

**Q16: "Activation rate is 85% but the acceptance rate for Tab suggestions is only 15%. What does that tell you?"**

*What they're testing:* Can you interpret data and form hypotheses?

*Approach:* High activation + low acceptance suggests people are trying Cursor but the suggestions aren't landing. Possible explanations:
- **Context gap** — The codebase might not be indexed properly, or the project uses highly proprietary frameworks the model hasn't seen before.
- **Rules missing** — Without Rules, the AI might suggest code that doesn't match the team's conventions, so developers reject it even when it's technically correct.
- **Comparison bias** — Developers who are very fast typists sometimes reject suggestions reflexively because they type faster than they can read the suggestion.
- **Model mismatch** — The default model might not be optimal for their language/framework.

Action plan: interview 3–5 developers who have low acceptance rates. Watch them use Cursor (screen share). Check if Rules are configured. Check codebase indexing status.

---

**Q17: "How would you attribute productivity improvements to Cursor specifically versus other changes happening at the same time (new hires, process changes, etc.)?"**

*What they're testing:* Analytical rigor. Do you understand confounding variables?

*Approach:* This is a real challenge. A few strategies:
- **Baseline before rollout** — Capture metrics (PRs/week, cycle time, survey scores) before Cursor is introduced. Compare against the same metrics during and after.
- **Control group** — If the organization is large enough, compare teams using Cursor against similar teams that haven't adopted yet.
- **Before/after within individuals** — Track the same developer's output before and after adoption.
- **Self-reported attribution** — Ask developers directly: "Of the time you saved this week, how much do you attribute to Cursor specifically?"
- **Be honest about limits** — You can't perfectly isolate the variable. Frame it as "strong evidence of contribution" rather than "definitive proof of causation." CTOs respect intellectual honesty.

---

**Q18: "A VP of Engineering says, 'My senior engineers don't need AI — it's only useful for juniors.' How do you respond?"**

*What they're testing:* Can you reframe a misconception without being condescending?

*Approach:* Respect the underlying concern — senior engineers are highly skilled and don't want to feel like they're being given training wheels. Then reframe: senior engineers benefit differently, but often *more*:
- **Multi-file refactoring** — Seniors are the ones who do large-scale code improvements. Agent mode makes it feasible to refactor across 20 files in an afternoon instead of a week.
- **Reducing toil** — Seniors still write boilerplate, config files, and tests. AI handles the tedious parts so they can focus on architecture and design decisions.
- **Code review efficiency** — Bugbot catches issues before the senior engineer reviews, so their review time is spent on meaningful architectural feedback, not catching typos.
- **Knowledge transfer** — Senior engineers can encode their expertise into Rules, which scales their standards across the whole team without them being a bottleneck.

Point to Salesforce: their senior engineers started with boring, tedious tasks, built trust, then expanded to high-value use cases.

---

## Section 4: Cross-Functional & Soft Skills

These questions test how you work with other teams and handle interpersonal complexity.

---

**Q19: "You hear the same feature request from 5 different enterprise accounts. How do you communicate that to the Product team?"**

*What they're testing:* Are you a structured communicator, or do you just forward emails?

*Approach:* Don't just say "5 customers want X." Synthesize:
1. **Identify the underlying problem** — What are all 5 accounts actually trying to solve? Often the surface-level request is different but the root need is the same.
2. **Quantify the impact** — What's the combined ARR of these accounts? What's the risk if the gap isn't addressed (churn, stalled expansion)?
3. **Provide context** — What workarounds are they using today? How does this affect their adoption trajectory?
4. **Suggest a framework** — "These 5 accounts share the same underlying problem: [X]. Here are two possible solution approaches, and here's my recommendation based on customer conversations."

Present this in a structured brief, not a Slack message.

---

**Q20: "How would you work with the Sales team to ensure they're positioning Cursor accurately?"**

*What they're testing:* Can you influence without authority?

*Approach:* The goal is to make Sales more effective, not to police them. Concrete actions:
- **Create a living "What Cursor Can and Can't Do" doc** — Updated quarterly, covering features, limitations, and honest positioning for common scenarios.
- **Build objection-handling playbooks** — For the top 10 objections (security, ROI, Copilot comparison), give Sales ready-made talk tracks.
- **Joint calls** — Sit in on Sales calls with technical buyers. Offer to run the technical portion of demos.
- **Feedback loop** — When a customer comes to you with misset expectations, trace it back to the Sales conversation and address the gap constructively — "Here's how we can position this better next time."

---

**Q21: "Tell me about a time you had to learn something complex and technical quickly, with no one to teach you."**

*What they're testing:* High agency, learning velocity, self-direction.

*Approach:* Use a real story. Structure it as:
- **Situation** — What was the context? What made it hard?
- **Action** — Specifically how did you learn? What resources, experiments, or strategies did you use?
- **Result** — What did you achieve? How fast?
- **Connection** — Tie it to this role: "That's exactly what I've done with Cursor — I spent three weeks building projects, reading docs, and studying deployment patterns to get to the point where I can have credible conversations with technical stakeholders."

---

**Q22: "Why Cursor? Why this role specifically?"**

*What they're testing:* Genuine interest and alignment, not a generic answer.

*Approach:* Be specific. Reference things only someone who's done real research would know:
- The product's architectural advantage (built-in AI vs. plugin)
- The company's trajectory ($1B ARR, NVIDIA/Stripe/Salesforce adoption)
- The specific appeal of the ADM role: you're at the intersection of product, customers, and technical adoption — not pure sales, not pure engineering, but the bridge between all of it
- What personally excites you about helping engineering teams adopt AI
- What you've learned from using Cursor yourself during your prep

---

## Section 5: Curveballs & Stress Tests

These are the questions designed to see how you think under pressure when there's no "right" answer.

---

**Q23: "If AI coding tools keep improving, do you think the role of a deployment manager becomes unnecessary in 2–3 years?"**

*What they're testing:* Can you think long-term and reason about ambiguity?

*Approach:* The tool gets better, but the human problems don't go away:
- Enterprise adoption is a *change management* challenge, not a technology challenge. Better AI doesn't eliminate the need for structured rollouts, stakeholder alignment, and behavior change.
- As the tool becomes more powerful (Automations, Cloud Agents), the deployment surface *expands* — there are more capabilities to configure, more workflows to integrate, more ROI stories to tell.
- The role evolves: from "help people use the editor" to "help organizations redesign how engineering teams work with AI." That's a bigger, more strategic role, not a smaller one.

---

**Q24: "A developer in a pilot tells you privately that they think Cursor is making their junior colleagues lazy — they're shipping AI-generated code without understanding it. What do you do?"**

*What they're testing:* Judgment, empathy, and practical problem-solving.

*Approach:* Take the concern seriously — it's a real risk. Don't dismiss it.
1. **Thank them** for the candid feedback.
2. **Acknowledge the pattern** — Over-reliance on AI without understanding is a legitimate risk, especially for junior developers. It's the "copy-paste from Stack Overflow" problem amplified.
3. **Propose mitigations** — Code review remains essential. Consider adding Rules that encourage the AI to explain its reasoning. Suggest pairing sessions where junior devs walk through AI-generated code with a senior. Recommend that the team's code review culture explicitly includes "do you understand this code?" as a review criterion.
4. **Feed this back to leadership** — Frame it as an adoption maturity issue, not a product flaw. "We should invest in training that teaches developers *how* to use AI responsibly, not just how to use the features."

---

**Q25: "Pitch me on Cursor in 60 seconds. Go."**

*What they're testing:* Can you be concise, compelling, and clear under time pressure?

*Approach:* Have a 60-second pitch memorized. Structure:
- **Hook** (10 seconds): "The average software engineer spends less than half their day actually writing code. The rest is searching, understanding, debugging, and doing repetitive work."
- **Product** (20 seconds): "Cursor is an AI-native code editor that changes that equation. It understands your entire codebase, can write and edit code from plain-English instructions, and can autonomously handle multi-file tasks end to end — from writing the code to running the tests."
- **Proof** (15 seconds): "64% of the Fortune 500 are using Cursor. NVIDIA has 40,000 engineers on it. Salesforce saw double-digit improvements in velocity, quality, and throughput."
- **ADM connection** (15 seconds): "My role would be to help enterprise engineering teams capture that value — understanding their workflows, guiding adoption, and proving ROI."

---

**Q26: "What's one thing about Cursor's product that you think could be better, and how would you address it with a customer who raises it?"**

*What they're testing:* Honesty, product thinking, and customer-facing composure.

*Approach:* Pick a real limitation (not a deal-breaker). Examples:
- Non-determinism — the same prompt can give different results, which frustrates developers who expect predictable tools. With a customer: "That's inherent to how LLMs work, but we mitigate it with Rules (which constrain the output), Plan Mode (which lets you review the approach before execution), and the fact that developers always review and approve changes before they're committed."
- Context limits on very large codebases — even with indexing, there's a ceiling. With a customer: "Cursor's indexing and RAG system handles the vast majority of use cases, but for extremely large monorepos, we'd want to validate during the pilot. I'd connect you with our engineering team to discuss how the indexing works for your specific setup."

---

**Q27: "How do you stay current on the AI landscape? What's something you've learned recently?"**

*What they're testing:* Genuine curiosity and ongoing learning habits.

*Approach:* Be specific. Mention actual sources: the Cursor changelog/blog, Hacker News, specific podcasts or newsletters (e.g., The Pragmatic Engineer, Latent Space), AI research announcements from OpenAI/Anthropic/Google. Then share one genuinely recent insight — something you read or noticed while using Cursor. The more specific and recent, the more credible.

---

## Section 6: How to Practice

1. **Out loud** — Reading silently isn't practice. Say the words. Record yourself.
2. **Timed** — Set a 2-minute timer per answer. If you can't get to the point in 2 minutes, you're not concise enough.
3. **With follow-ups** — After each answer, ask yourself: "What would they ask next?" Prepare for that too.
4. **Weakest areas first** — If a question makes you uncomfortable, that's the one to practice most.
5. **Real-world grounding** — Whenever possible, reference your actual experience using Cursor ("When I was building X, I noticed...").

---

*Last updated: March 30, 2026*
*You've done the study work, Richard. This is about sharpening delivery.*

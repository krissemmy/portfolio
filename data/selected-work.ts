// Keep client results attributed. Detailed source notes live in docs/content-sources.md.
export const selectedWork = [
  {
    title: "RestoreAI: production platform and AI infrastructure",
    kind: "Professional work · Current",
    details: [
      {
        label: "Result",
        text: "Reduced dev/staging AWS spend from roughly $700/day to $200/day through GPU right-sizing, workload placement, and unused-resource cleanup.",
      },
      {
        label: "Infrastructure ownership",
        text: "I own production infrastructure on Nebius and dev/staging on AWS, including databases, networking, and GPU-backed AI workloads.",
      },
      {
        label: "Defined deployment workflows",
        text: "Built isolated development, staging, preview, and production environments so product engineers can ship through defined workflows. Container build-and-deploy pipelines include health checks and rollback paths.",
      },
      {
        label: "AI workload operations",
        text: "I operate GPU-backed video search and summarization workloads, testing model configurations and GPU sizing against requirements with NVIDIA NIM/VSS.",
      },
      {
        label: "Release safety and recovery",
        text: "Improved release safety and recovery through database restore validation, vulnerability scanning, and operational runbooks.",
      },
      {
        label: "Technical SOC 2 Type II preparation",
        text: "I lead technical preparation and evidence automation across AWS, Nebius, GitHub, and Drata. This is preparation work, not completed certification.",
      },
    ],
    links: [{ label: "Read about my RestoreAI work", href: "/projects/restoreai-platform-infrastructure" }],
  },
  {
    title: "Startup infrastructure consulting and migrations",
    kind: "Client engagements · Carybin and Letsdap",
    details: [
      { label: "Problem", text: "Managed infrastructure costs had outgrown what these early-stage teams needed." },
      { label: "My contribution", text: "I handled migrations, deployment workflows, recovery procedures, and handover. At Letsdap, I moved application hosting while keeping MongoDB managed." },
      { label: "Outcome", text: "Carybin's core hosting went from about $300/month to €8/month. Letsdap's founder reports roughly 90% lower hosting costs and 65% lower total recurring infrastructure spend." },
    ],
    links: [
      { label: "Carybin case study", href: "/projects/case-study-migrating-infrastructure-for-a-startup" },
      { label: "Letsdap case study", href: "/projects/how-i-cut-a-startups-infrastructure-cost" },
    ],
  },
  {
    title: "KraiNode: browser-based JSON-RPC tooling",
    kind: "Personal project",
    details: [
      { label: "Problem", text: "Investigating an RPC endpoint often starts with a vague report that requests are slow or failing." },
      { label: "My contribution", text: "I built a browser-based JSON-RPC playground for sending requests and inspecting responses and timings." },
      { label: "Outcome", text: "A repeatable way to test endpoint behavior and turn a reported issue into a request another engineer can inspect." },
    ],
    links: [
      { label: "Explore KraiNode", href: "/projects/krainode" },
      { label: "Open the tool", href: "https://krainode.krissemmy.com/" },
    ],
  },
];

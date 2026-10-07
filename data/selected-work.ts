// Keep client results attributed. Detailed source notes live in docs/content-sources.md.
export const selectedWork = [
  {
    title: "RestoreAI: production platform and AI infrastructure",
    kind: "Professional work · Current",
    problem: "A small AI startup needs someone to own the infrastructure behind its product and GPU workloads.",
    contribution: "I own deployment workflows across production, staging, development, and previews, alongside GPU infrastructure and NVIDIA NIM/VSS model serving.",
    outcome: "Repeatable deployments, improved production access, and automated evidence collection for technical SOC 2 Type II readiness. Removed an unused Microsoft Entra service costing $300/month.",
    links: [{ label: "Read about my RestoreAI work", href: "/projects/restoreai-platform-infrastructure" }],
  },
  {
    title: "Startup infrastructure consulting and migrations",
    kind: "Client engagements · Carybin and Letsdap",
    problem: "Managed infrastructure costs had outgrown what these early-stage teams needed.",
    contribution: "I handled migrations, deployment workflows, recovery procedures, and handover. At Letsdap, I moved application hosting while keeping MongoDB managed.",
    outcome: "Carybin's core hosting went from about $300/month to €8/month. Letsdap's founder reports roughly 90% lower hosting costs and 65% lower total recurring infrastructure spend.",
    links: [
      { label: "Carybin case study", href: "/projects/case-study-migrating-infrastructure-for-a-startup" },
      { label: "Letsdap case study", href: "/projects/how-i-cut-a-startups-infrastructure-cost" },
    ],
  },
  {
    title: "KraiNode: browser-based JSON-RPC tooling",
    kind: "Personal project",
    problem: "Investigating an RPC endpoint often starts with a vague report that requests are slow or failing.",
    contribution: "I built a browser-based JSON-RPC playground for sending requests and inspecting responses and timings.",
    outcome: "A repeatable way to test endpoint behavior and turn a reported issue into a request another engineer can inspect.",
    links: [
      { label: "Explore KraiNode", href: "/projects/krainode" },
      { label: "Open the tool", href: "https://krainode.krissemmy.com/" },
    ],
  },
];

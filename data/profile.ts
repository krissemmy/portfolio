export const profile = {
  name: "Emmanuel Christopher",
  // Short line used for metadata / SEO and social cards.
  headline:
    "Cloud Platform / DevOps Engineer working across production infrastructure, AI infrastructure, deployments, reliability, and debugging.",
  email: "krissemmy17@gmail.com",
  // Separate from `email`: recruiters and general contact use the personal
  // address, client/consulting inquiries go here. Also the verified Resend
  // sending domain, so the /consulting form sends from it.
  consultingEmail: "consulting@krissemmy.com",
  github: "https://github.com/krissemmy",
  linkedin: "https://www.linkedin.com/in/emmanuel-christopher/",
  twitter: "https://x.com/chris__emma",
  twitterHandle: "@chris__emma",
  tiktok: "https://www.tiktok.com/@infrawithchris",
  youtube: "https://www.youtube.com/@krissemmy",
  siteName: "Emmanuel Christopher",
  siteUrl: "https://www.krissemmy.com",
};

export const hero = {
  title: "Cloud Platform / DevOps Engineer",
  subtitle:
    "I own production and AI infrastructure at RestoreAI, a small AI startup. I build deployment workflows, operate GPU workloads, and debug the systems the product depends on.",
  experience:
    "Previously at GlueX, I cut AWS spend from about $25,000 to $8,500 per month (66%) and improved request latency through infrastructure and performance tuning. My consulting work includes completed migrations for Carybin, Letsdap, and Dailzero.",
};

export const about = [
  "My work sits between product development and day-to-day operations. At RestoreAI, that includes turning release requirements into repeatable workflows and making access, recovery, and compliance evidence part of normal infrastructure work.",
  "I bring a developer-support mindset to that responsibility: reproduce the issue, follow the request through logs and metrics, and leave the next engineer with a clear explanation. Earlier work in data pipelines and API/RPC operations taught me to look beyond the server when a system behaves badly.",
];

export const skills = [
  {
    category: "Cloud & platform operations",
    items: ["AWS", "Nebius", "Hetzner", "Linux", "Docker", "Coolify", "Dokploy"],
  },
  {
    category: "AI infrastructure",
    items: ["GPU infrastructure", "Model serving", "NVIDIA NIM / VSS", "GPU workload sizing", "Model runtime testing"],
  },
  {
    category: "Infrastructure & deployments",
    items: ["Terraform", "Terragrunt", "GitHub Actions", "Deployment automation", "Preview environments"],
  },
  {
    category: "Reliability & debugging",
    items: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Incident response", "JSON-RPC", "API diagnostics"],
  },
  {
    category: "Access & readiness",
    items: ["AWS IAM", "SSM", "Tailscale", "SOC 2 technical readiness", "Evidence automation", "Backup & restore validation"],
  },
  {
    category: "Data & languages",
    items: ["PostgreSQL", "MongoDB", "Redis", "BigQuery", "dlt", "Python", "SQL", "Bash"],
  },
  {
    category: "Personal projects & labs",
    items: ["Kubernetes", "Helm", "Alloy", "Mimir"],
  },
  {
    category: "Coding tools",
    items: ["Claude Code", "Codex", "Cursor"],
  },
];

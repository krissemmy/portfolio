export const profile = {
  name: "Emmanuel Christopher",
  // Short line used for metadata / SEO and social cards.
  headline:
    "Cloud / DevOps + Technical Support Engineer — infrastructure, APIs, reliability, and developer-facing systems",
  email: "krissemmy17@gmail.com",
  github: "https://github.com/krissemmy",
  linkedin: "https://www.linkedin.com/in/emmanuel-christopher/",
  twitter: "https://x.com/chris__emma",
  twitterHandle: "@chris__emma",
  siteName: "Emmanuel Christopher",
  siteUrl: "https://krissemmy.com", // Update this with your actual domain
};

// Hero copy for the landing page.
export const hero = {
  title:
    "Cloud / DevOps Engineer for Reliable Infrastructure, APIs, and Developer Support",
  subtitle:
    "I build and support production systems across cloud infrastructure, deployments, observability, APIs, databases, and developer tooling. My background spans AI infrastructure, DevOps, data systems, and blockchain/RPC operations.....but the common thread is debugging complex systems, improving reliability, and making technical issues easier to resolve.",
};

// About / summary paragraphs.
export const about = [
  "I work on the parts of software that have to stay up: cloud environments, deployment pipelines, monitoring, APIs, and the data systems behind them. Day to day that means provisioning infrastructure, shipping changes safely, watching production, and digging into whatever breaks until I understand the root cause.",
  "A lot of that work is really support and debugging — reproducing an issue, reading logs and metrics, isolating a degraded dependency, and writing it up clearly so the next person can act on it. I've done this across AI infrastructure, DevOps, data pipelines, and high-uptime blockchain/RPC environments, which are some of the most demanding production systems I've operated.",
];

// Two recruiter-facing paths so each audience can self-select quickly.
export const tracks = [
  {
    audience: "For Cloud / DevOps & Infrastructure teams",
    summary:
      "I own infrastructure end to end and keep production reliable and cost-efficient.",
    points: [
      "Infrastructure as Code with Terraform; provisioning on AWS, Nebius, and Hetzner",
      "CI/CD pipelines, containerization, and Kubernetes deployments",
      "Observability stacks (Prometheus, Grafana, Loki, Mimir, Alloy) with alerting and SLOs",
      "Cost optimization — e.g. cutting a startup's hosting from ~$300/mo to ~€8/mo",
      "Reliability work: uptime, capacity, snapshots, recovery, and zero-downtime upgrades",
    ],
  },
  {
    audience: "For Support / Developer Support teams",
    summary:
      "I debug production issues, communicate clearly, and make problems reproducible.",
    points: [
      "Troubleshooting APIs and RPC endpoints: latency, errors, and degraded upstreams",
      "Incident response, escalation, and root-cause investigation under pressure",
      "Clear written communication and documentation engineers can act on",
      "Reproducible findings — turning vague reports into concrete steps and evidence",
      "Building diagnostic tooling so others can self-serve (used by 400+ engineers)",
    ],
  },
];

// Skills grouped for fast scanning by recruiters.
export const skills = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "GCP", "Nebius", "Hetzner", "Terraform", "Docker", "Kubernetes", "Coolify", "Dokploy"],
  },
  {
    category: "CI/CD & Automation",
    items: ["GitHub Actions", "GitOps", "Helm", "Bash", "Python"],
  },
  {
    category: "Observability & Reliability",
    items: [
      "Prometheus",
      "Grafana",
      "Loki",
      "Mimir",
      "Alloy",
      "Alerting",
      "Incident response",
    ],
  },
  {
    category: "APIs & Debugging",
    items: [
      "REST",
      "JSON-RPC",
      "Latency analysis",
      "Endpoint diagnostics",
      "Reproducible bug reports",
      "Blockchain RPC debugging",
    ],
  },
  {
    category: "Data Systems",
    items: ["PostgreSQL", "BigQuery", "dlt", "ETL / ELT", "Airflow"],
  },
  {
    category: "AI Agents & Workflows",
    items: ["Claude Code", "Codex", "Cursor", "MCP", "Agent workflows"],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "Bash"],
  },
];

# Content sources and claim boundaries

Reviewed 7 October 2026. This is an editorial record, not a live infrastructure audit.

| Claim | Source and treatment |
| --- | --- |
| RestoreAI scope, GPU/NIM/VSS, environment workflows, Terraform/Terragrunt, SSM/Tailscale, SOC 2 Type II readiness | Owner's instructions for this update, supported by the linked DevOps resume. Public copy covers responsibilities without internal topology. Readiness is not certification. |
| RestoreAI dev/staging AWS spend, roughly $700/day to $200/day | Current DevOps resume, rechecked 7 October 2026. GPU right-sizing, workload placement, and unused-resource cleanup. Applies only to dev/staging AWS spend; no total-company or annual-savings extrapolation. This replaces Microsoft Entra cleanup as the featured outcome. |
| GlueX AWS spend, about $25k to $8.5k/month (66%) | Both current DevOps and general resumes give these figures (modified 29 September 2026). Owner explicitly confirmed using the resumes on 7 October. No alternate figure inferred. |
| GlueX latency improvement | The two current resumes omit a percentile label. Published qualitatively; numerical latency needs the measurement definition and percentile before use. |
| Carybin core hosting, about $300/month to €8/month | Existing migration entry and Carybin recommendation in `data/testimonials.ts`. Original currencies and approximate scope retained; not converted into a total-spend percentage. |
| Letsdap hosting about 90%, total recurring infrastructure about 65% | Founder recommendation in `data/testimonials.ts`; separately attributed. Existing article supports keeping MongoDB managed. |
| Dailzero migration and handover | Owner-directed review of `dailzero/NEON_TO_DOKPLOY.md` and `dailzero/OPERATIONS_HANDOVER.md` in the consultation workspace. Records dated 19–20 August 2026 distinguish rehearsed migration checks from a completed staging R2 restore. No measured downtime, savings, production restore, or full disaster-recovery claim added. No private identifiers copied. |
| KraiNode adoption | Google Analytics 4 for KraiNode, 1 September 2025 through 27 October 2026: 669 active users and 674 new users. Public copy says "650+ users since Sep 2025". GA counts visitors in that window. Copy does not call them engineers or developers, and does not claim signups, MAU, retention, or a country count. |
| Kubernetes and Helm | Owner explicitly identifies this as personal/lab experience. Kubernetes projects and skills labeled accordingly. |
| ShipCheck | Local project README confirms server-side inspection and separate Launch Score / Inspection Confidence. Removed outdated browser-only wording and implication that a score proves production readiness. |

Resume sources (read, not modified):
- DevOps: https://drive.google.com/file/d/16Yj9ImiqIGb8TPxl9H_k1DXPeYmEP0ju/view
- General: https://drive.google.com/file/d/1g-8yP4KICS7orlreJXXDQGp5pWh1FJ7j/view

Existing project URLs and all six resume IDs are preserved. The PDFs were not updated.
Before reintroducing numerical latency claims, confirm the measurement definition and
percentile. KraiNode's public user count is the verified GA4 window in the table above.
Original client quotations remain unchanged.

Canonical origin is `https://www.krissemmy.com`: the apex returned a redirect to this
hostname, and the www homepage returned HTTP 200 during this update.

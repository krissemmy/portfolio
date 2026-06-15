export interface Resume {
  title: string;
  description: string;
  fileId: string;
}

// Ordered so support and cloud/infra roles see the most relevant resume first.
export const resumes: Resume[] = [
  {
    title: "Technical Support / Developer Support Resume",
    description: "For support roles — debugging production and API issues, incident response, clear communication, documentation, and reproducible findings.",
    fileId: "1fggGk8rv3pertD3VdpQL4QZ3SfPeJmhv",
  },
  {
    title: "DevOps / Cloud Infrastructure Resume",
    description: "For cloud and platform roles — IaC with Terraform, CI/CD, containers and Kubernetes, observability, and reliability.",
    fileId: "16Yj9ImiqIGb8TPxl9H_k1DXPeYmEP0ju",
  },
  {
    title: "Data Infrastructure Resume",
    description: "Data engineering experience — ETL/ELT pipelines, warehousing, and the infrastructure behind data systems.",
    fileId: "1nCtCr_h_Nsj7360wYC0cZtrVy4euu545",
  },
  {
    title: "Web3 Infrastructure Resume",
    description: "Infrastructure and DevOps work applied in blockchain/Web3 environments — deployments, monitoring, and reliability.",
    fileId: "12ioX-92QZzGQSoh4WzjUMPOu11wuf6SL",
  },
  {
    title: "NodeOps Resume",
    description: "Blockchain node operations — uptime, latency, monitoring, incident response, snapshots, and recovery workflows.",
    fileId: "1CtgzvswZGfPktWZ4AM0NzgRzCf8U7N49",
  },
  {
    title: "General CV",
    description: "Comprehensive CV covering all professional experience and skills.",
    fileId: "1g-8yP4KICS7orlreJXXDQGp5pWh1FJ7j",
  },
];

export function getResumeUrls(fileId: string) {
  return {
    previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    driveUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
  };
}


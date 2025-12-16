export interface Resume {
  title: string;
  description: string;
  fileId: string;
}

export const resumes: Resume[] = [
  {
    title: "Web3 Node Operator",
    description: "Blockchain resume focused on node operations and Web3 infrastructure management",
    fileId: "1CtgzvswZGfPktWZ4AM0NzgRzCf8U7N49",
  },
  {
    title: "Web3 Infrastructure",
    description: "Blockchain resume highlighting Web3 infrastructure engineering and DevOps expertise",
    fileId: "12ioX-92QZzGQSoh4WzjUMPOu11wuf6SL",
  },
  {
    title: "Web3 Data Engineer",
    description: "Blockchain resume showcasing data engineering experience in Web3 and blockchain ecosystems",
    fileId: "1XlsToo-9ciDZVzhJlPhmmabtWDcR5ReX",
  },
  {
    title: "General CV",
    description: "Comprehensive CV covering all professional experience and skills",
    fileId: "1g-8yP4KICS7orlreJXXDQGp5pWh1FJ7j",
  },
  {
    title: "Data Engineer",
    description: "Traditional data engineering resume with ETL pipelines and data infrastructure experience",
    fileId: "1nCtCr_h_Nsj7360wYC0cZtrVy4euu545",
  },
  {
    title: "DevOps Engineer",
    description: "DevOps resume highlighting containerization, Kubernetes, and infrastructure automation",
    fileId: "16Yj9ImiqIGb8TPxl9H_k1DXPeYmEP0ju",
  },
];

export function getResumeUrls(fileId: string) {
  return {
    previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    driveUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
  };
}


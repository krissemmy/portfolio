import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import { pageMetadata } from "@/util/metadata";
import "./mdx.css";

type Props = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export function generateMetadata({ params }: Props) {
  const project = allProjects.find((project) => project.published && project.slug === params.slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.description, `/projects/${project.slug}`);
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.published && project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-zinc-50 min-h-screen">
      <Header project={project} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </main>
  );
}

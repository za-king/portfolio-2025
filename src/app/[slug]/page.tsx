import Layout from "@/components/Layout";
import DetailComp from "@/components/DetailComp";
import { fetchProjectById } from "@/lib/api";
type Project = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  tagLine?: string;
  status?: string;
  challenges?: string[] | undefined;
  technologies?: string[] | undefined;
  features?: string[] | undefined;
  role?: string;
  projectDuration: Number;
  teamSize: Number;
  sourceUrl?: string;
  demoUrl?: string;
};

interface ProjectPageProps {
  params: { slug: string };
}
async function Detail({ params }: ProjectPageProps) {
  const project = await fetchProjectById(params.slug);

  if (!project) {
    return <p>Project not found.</p>;
  }
  return (
    <Layout>
      <div className="min-h-screen">
        <DetailComp
          project={{
            id: project?.id || "id",
            title: project?.title || "title",
            description: project?.description || "No description available",
            imageUrl: project?.imageUrl || "",
            tagLine: project?.tagLine || "",
            status: project?.status || "unknown",
            challenges: project?.challenges || [],
            technologies: project?.technologies || [],
            features: project?.features || [],
            role: project?.role || "N/A",
            projectDuration: project?.projectDuration || 0,
            teamSize: project?.teamSize || 1,
            sourceUrl: project?.sourceUrl || "",
            demoUrl: project?.demoUrl || "",
          }}
        />
      </div>
    </Layout>
  );
}

export default Detail;

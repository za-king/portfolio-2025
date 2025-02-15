import Layout from "@/components/Layout";
import ProjectGroupComp from "@/components/ProjectGroupComp";
function Projects() {
  return (
    <Layout>
      <div className="py-12">
        <div className="mx-auto w-full max-w-3xl px-4 ">
          <ProjectGroupComp />
        </div>
      </div>
    </Layout>
  );
}

export default Projects;

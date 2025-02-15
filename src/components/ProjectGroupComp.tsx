"use client";
import { useEffect, useState } from "react";
import { fetchProjects } from "../lib/api";
import CardComp from "./CardComp";
type Project = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};
const ProjectGroupComp = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const data: Project[] = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  justify-items-center items-center">
        {projects.map((project: Project, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key

            <CardComp key={index} project={project} />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGroupComp;

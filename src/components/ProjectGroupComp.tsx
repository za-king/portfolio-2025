"use client";
import { useEffect, useState } from "react";
import { fetchProjects } from "../lib/api";
import CardComp from "./CardComp";
import { LoadingGridComp } from "./LoadingGridComp";
type Project = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

import { motion } from "framer-motion";

const ProjectGroupComp = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data: Project[] = await fetchProjects(); // Jangan kirim `isLoading`
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); // Matikan loading setelah fetch selesai
      }
    };
    getProjects();
  }, []);

  if (isLoading) {
    return <LoadingGridComp />;
  }

  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  justify-items-center items-center"
      >
        {projects.map((project: Project, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardComp key={index} project={project} index={index} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectGroupComp;

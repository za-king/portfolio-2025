"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  tagLine?: string;
};

type ProjectItemProps = {
  project: Project;
  index: number;
};
const CardComp: React.FC<ProjectItemProps> = ({ project, index }) => {
  const [showDescription, setShowDescription] = useState(false);
  const HideDesc = (desc: string | undefined) => {
    if (!desc) desc = "";
    if (!showDescription) {
      desc = desc.substring(0, 50) + "...";
    }
    return desc;
  };

  const toggleShowFullDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Card className=" transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * index }}
          >
            {project?.title}
          </motion.span>
        </CardTitle>
        <CardDescription>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * index }}
          >
            {project?.tagLine}
          </motion.span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <motion.div
            initial={false}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <Image
              alt="Card thumbnail"
              className="h-full w-full object-cover"
              height="200"
              src={project?.imageUrl || "/placeholder.jpg"}
              width="350"
            />
          </motion.div>
        </div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * index }}
        >
          <p className="mt-4 text-sm text-muted-foreground">
            {HideDesc(project.description)}
            <button
              onClick={toggleShowFullDescription}
              className="text-gray-800 hover:text-gray-900 "
            >
              {showDescription ? "less" : "more"}
            </button>
          </p>
        </motion.span>
      </CardContent>
      <CardFooter className="items-end justify-end">
        <Link href={`/${project?.id}`}>
          <Button className=" group" variant="ghost">
            See Detail
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComp;

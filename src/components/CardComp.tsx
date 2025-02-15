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
type Project = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  tagLine?: string;
};

type ProjectItemProps = {
  project: Project;
};
const CardComp: React.FC<ProjectItemProps> = ({ project }) => {
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
        <CardTitle>{project?.title}</CardTitle>
        <CardDescription>{project?.tagLine}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <Image
            alt="Card thumbnail"
            className="h-full w-full object-cover"
            height="200"
            src={project?.imageUrl || "/placeholder.jpg"}
            width="350"
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {HideDesc(project.description)}
          <button
            onClick={toggleShowFullDescription}
            className="text-gray-800 hover:text-gray-900 "
          >
            {showDescription ? "less" : "more"}
          </button>
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/${project?.id}`}>
          <Button className="mr-auto group" variant="ghost">
            See Detail
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComp;

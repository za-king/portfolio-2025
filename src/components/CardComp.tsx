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
  console.log(project);
  return (
    <Card className="w-[350px] transition-all hover:shadow-lg">
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
          {project?.description}
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

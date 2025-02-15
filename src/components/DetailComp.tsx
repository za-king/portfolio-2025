"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

type ProjectItemProps = {
  project: Project;
};

export default function DetailComp({ project }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl p-4"
    >
      {/* Project Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project && project?.title}</h1>
            <p className="text-lg text-muted-foreground">
              {project && project?.tagLine}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={(project && project?.demoUrl) || ""}>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                Live Demo
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
            <Link href={(project && project?.sourceUrl) || ""}>
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                Source
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Image */}
        <Card className="overflow-hidden">
          <div className="aspect-video w-full">
            <Image
              src={(project && project?.imageUrl) || "testiing.jpg"}
              alt="Project preview"
              className="h-full w-full object-cover"
              width={800}
              height={450}
            />
          </div>
        </Card>
      </div>

      {/* Technologies */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Technologies Used</CardTitle>
          <CardDescription>
            The main technologies and tools used in this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.length &&
              project?.technologies.map((tech: string, index: Number) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Comprehensive information about the project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <h3 className="text-lg font-semibold">Project Overview</h3>
              <p className="text-muted-foreground">
                {project && project?.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Project Duration</h4>
                  <p className="text-sm text-muted-foreground">
                    {project && project?.projectDuration.toString()} months
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Team Size</h4>
                  <p className="text-sm text-muted-foreground">
                    {project && project?.teamSize.toString()} developers
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Role</h4>
                  <p className="text-sm text-muted-foreground">
                    {project && project.role}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    {project && project.status}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="space-y-4">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {project.features?.length &&
                  project?.features.map((feat: string, index: Number) => (
                    <li key={feat}>{feat}</li>
                  ))}
              </ul>
            </TabsContent>
            <TabsContent value="challenges" className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Challenges</h3>
              <div className="space-y-4">
                {project.challenges?.length &&
                  project?.challenges.map((chall: string, index: Number) => (
                    <h4 className="font-medium" key={chall}>
                      {chall}
                    </h4>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeComp() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container relative flex min-h-screen flex-col items-center justify-center gap-4 px-4 sm:gap-8 md:px-6">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
          }}
          className="space-y-4 text-center"
        >
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Beautiful personal portfolio websites{" "}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
            >
              future of web development with our cutting-edge platform.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
            className="space-x-4"
          >
            <Link href={"/projects"}>
              <Button size="lg" className="group">
                Get Started{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="flex gap-4"
        >
          <Link
            href="https://github.com/za-king"
            className="rounded-full bg-background/95 p-4 text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">Github</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/m-zaky-syukur/"
            className="rounded-full bg-background/95 p-4 text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Modern Development",
    description:
      "Build with the latest technologies and frameworks for optimal performance.",
  },
  {
    title: "Rapid Deployment",
    description:
      "Deploy your applications with a single click to our global network.",
  },
  {
    title: "Smart Scaling",
    description:
      "Automatically scale your applications based on demand and traffic.",
  },
  {
    title: "Real-time Analytics",
    description:
      "Get detailed insights about your application's performance and usage.",
  },
  {
    title: "Advanced Security",
    description:
      "Enterprise-grade security features to protect your applications.",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock support from our team of expert developers.",
  },
];

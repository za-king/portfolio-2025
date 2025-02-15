import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8">
          {/* Logo and Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Company. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>

            <Link
              href="https://www.linkedin.com/in/m-zaky-syukur/"
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/za-king"
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

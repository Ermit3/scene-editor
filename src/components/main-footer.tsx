import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.shell />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Ermit3
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.canvaEditor}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            . More projects on my{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              repository
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
};

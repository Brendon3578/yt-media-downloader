import { AudioLines, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SheetContent, Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";
import { cx } from "class-variance-authority";

export function Header() {
  const links = [
    {
      page: "Home",
      path: "/",
    },
    {
      page: "About Us",
      path: "/about-us",
    },
    {
      page: "Terms of Services",
      path: "/terms-of-services",
    },
  ];

  const location = useLocation();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background md:justify-around px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="hidden group md:flex items-center gap-3 text-lg font-semibold md:text-base p-1.5 rounded"
        >
          <AudioLines className="h-6 w-6 text-primary" />
          <span className="text-foreground">Media Downloader</span>
        </Link>
        {links.map((link) => (
          <Link
            to={link.path}
            className={cx(
              link.path == location.pathname
                ? "text-foregrond"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground"
            )}
            key={`${link.path}-mobile`}
          >
            {link.page}
          </Link>
        ))}
      </nav>
      <ModeToggle className="hidden md:inline-flex" />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Alternar o menu de navegação</span>
          </Button>
        </SheetTrigger>

        <Link
          to="/"
          className="md:hidden group flex items-center gap-3 text-lg font-semibold md:text-base p-1.5 rounded"
        >
          <AudioLines className="h-6 w-6 text-primary" />
          <span className="text-foreground">Media Downloader</span>
        </Link>

        <SheetContent side="top" className="flex flex-col gap-8">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="max-w-min flex items-center gap-2 text-lg font-semibold md:text-base p-1.5 rounded "
            >
              <AudioLines className="h-6 w-6 text-primary" />
              <span className="sr-only">Media Downloader</span>
            </Link>
            {links.map((link) => (
              <Link
                to={link.path}
                key={`${link.path}-mobile`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.page}
              </Link>
            ))}
          </nav>
          <ModeToggle />
        </SheetContent>
      </Sheet>
    </header>
  );
}

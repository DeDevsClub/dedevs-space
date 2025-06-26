import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  action?: {
    title: string;
    url: string;
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo-horizontal.svg",
    alt: "logo",
    title: "DeDevs",
  },
  menu = [
    {
      title: "Resources",
      url: "#",
      items: [],
    },
  ],
}: NavbarProps) => {
  return (
    <section className="py-0">
      <div className="container flex justify-start">
        <nav className="hidden justify-start lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="justify-start">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          <div className="flex w-[600px] gap-4 p-4 md:w-[700px] lg:w-[800px]">
            {/* Left Big Square (first item) */}
            <div className="flex w-1/4 flex-col">
              {((): React.JSX.Element => {
                const subItem = item.items[0];
                return (
                  <NavigationMenuLink
                    asChild
                    key={subItem.title}
                    className="h-full"
                  >
                    <Link
                      href={subItem.url}
                      className={cn(
                        "group flex h-full w-full select-none border-2 flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      )}
                    >
                      <div className="mb-2 mt-2 flex items-center justify-center text-lg font-medium">
                        {subItem.icon && (
                          <span className="mr-2 transition-transform duration-150 ease-in-out group-hover:scale-110">
                            {subItem.icon}
                          </span>
                        )}
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-tight text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </Link>
                  </NavigationMenuLink>
                );
              })()}
            </div>
            {item.items && item.items.length > 1 && (
              <div className="flex w-3/4 flex-col">
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {item.items.slice(1).map((subItem: MenuItem) => (
                    <li key={subItem.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={subItem.url}
                          className={cn(
                            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm sm:text-base font-medium leading-none flex items-center gap-2">
                            {subItem.icon && (
                              <span className="mr-2 transition-transform duration-150 ease-in-out group-hover:scale-110">
                                {subItem.icon}
                              </span>
                            )}
                            {subItem.title}
                          </div>
                          {subItem.description && (
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {subItem.description}
                            </p>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const IconLink = ({
  icon,
  url,
  name,
}: {
  icon: string;
  url: string;
  name: string;
}) => {
  return (
    <Button asChild variant="outline">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {name}
        <Icon icon={icon} className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };

"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  weight: "700", // or other valid weights
  subsets: ["latin"], // or other subsets
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent text-lg hover:bg-transparent rounded-md hover:border-primary border-transparent px-3.5",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav
      className="h-20 flex border-b 
     justify-between font-medium bg-white"
    >
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semi-bold", poppins.className)}>
          cokershop
        </span>
      </Link>

      <NavbarSidebar
      items={navbarItems}
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
      
       />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          variant="secondary"
          asChild
          className="border-l border-t-0 border-b-0 border-r-0
        px-12 h-full rounded-none bg-white hover:bg-pink-400 trasition-colors text-lg"
        >
          <Link href="/sign-in">Log in</Link>
        </Button>

        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0
        px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-white trasition-colors text-lg"
        >
          <Link href="/sign-up">Start selling</Link>
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center"
      onClick={() => setIsSidebarOpen(true)}>
        <Button
        variant="ghost"
        className="size-12 border-transparent bg-white">
            <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

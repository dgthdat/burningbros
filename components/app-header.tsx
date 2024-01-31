"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch() {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("search", searchValue);

    router.push(searchValue ? `/?${newParams.toString()}` : "/");
  }

  return (
    <Popover>
      <PopoverPrimitives.Anchor>
        <header className="p-4 shadow flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold md:absolute">
            Products
          </Link>

          <div className="hidden md:block relative mx-auto">
            <Input
              className="focus-visible:ring-0 min-w-96"
              placeholder="Search products by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute z-10 right-0 bottom-1/2 translate-y-1/2"
              onClick={handleSearch}
            >
              <Search />
            </Button>
          </div>

          <PopoverTrigger className="md:hidden">
            <Search />
          </PopoverTrigger>
        </header>
      </PopoverPrimitives.Anchor>

      <PopoverContent className="w-[--radix-popover-trigger-width] py-0 px-4 bg-transparent border-none shadow-none">
        <div className="bg-white shadow-lg border p-4 rounded grid gap-2">
          <Label>
            Search product by name
            <Input
              className="focus-visible:ring-0 mt-2"
              placeholder="iPhone 9"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Label>

          <PopoverPrimitives.PopoverClose
            className="bg-foreground py-2 rounded text-background"
            onClick={handleSearch}
          >
            Search
          </PopoverPrimitives.PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function AppHeader() {
  return (
    <Suspense>
      <Header />
    </Suspense>
  );
}

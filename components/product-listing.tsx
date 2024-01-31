"use client";

import { Product, getProducts } from "@/lib/products";
import { useScrolledToEnd } from "@/lib/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function List() {
  const search = useSearchParams().get("search");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["products", search],
    queryFn: ({ pageParam: skip }) => getProducts({ skip, search }),
    initialPageParam: 0,
    getNextPageParam: ({ total, limit, skip }) =>
      total === limit ? null : skip + 20,
  });

  const { containerRef } = useScrolledToEnd<HTMLDivElement>({
    callback: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  const products =
    data?.pages.reduce(
      (acc, cur) => [...acc, ...cur.products],
      [] as Product[]
    ) ?? [];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(0,350px))] h-full overflow-scroll max-w-7xl w-fit mx-auto justify-center"
    >
      {products.map((p) => (
        <ProductCard key={p.id} data={p} />
      ))}
    </div>
  );
}

export default function ProductListing() {
  return (
    <Suspense>
      <List />
    </Suspense>
  );
}

import { getProducts } from "@/lib/products";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { List } from "../../components/product-listing";

export default async function ProductsPage({
  searchParams: { search },
}: {
  searchParams: { search?: string };
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products", search],
    queryFn: ({ pageParam: skip }) => getProducts({ skip, search }),
    initialPageParam: 0,
    getNextPageParam: ({ total, limit, skip }) =>
      total === limit ? null : skip + 20,
    pages: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <List />
    </HydrationBoundary>
  );
}

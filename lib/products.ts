export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export async function getProducts({
  skip = 0,
  search,
}: {
  skip?: number;
  search?: string | null;
}) {
  const urlSearchParams = new URLSearchParams({
    limit: "20",
    skip: String(skip),
  });

  if (search) {
    urlSearchParams.set("q", search);
  }

  const url =
    "https://dummyjson.com/products" +
    (search ? "/search" : "") +
    `?${urlSearchParams.toString()}`;

  const res = await fetch(url);
  const data = await res.json();

  return data as {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  };
}

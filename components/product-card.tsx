import Image from "next/image";
import { type Product } from "@/lib/products";
import { Button } from "./ui/button";

export function ProductCard({ data }: { data: Product }) {
  const { title, description, thumbnail, price } = data;

  return (
    <article className="border grid grid-rows-[2fr,minmax(0,1fr)] max-h-[350px] md:max-h-96">
      <div className="relative border-b">
        <Image
          src={thumbnail}
          alt=""
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="p-2 grid grid-rows-[minmax(0,1fr),auto]">
        <div>
          <p className="font-semibold text-lg line-clamp-1">{title}</p>
          <p className="text-xs line-clamp-2">{description}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-foreground">${price}</p>
          <Button size="sm" className="h-8">
            Buy
          </Button>
        </div>
      </div>
    </article>
  );
}

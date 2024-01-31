import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import Providers from "./_providers";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="h-full grid grid-rows-[auto,minmax(0,1fr),auto]">
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
      </div>
    </Providers>
  );
}

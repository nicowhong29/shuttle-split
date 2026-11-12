import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { Suspense } from "react";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense>
        <Header />
        <div className="flex-1 flex px-6 my-6">{children}</div>
      </Suspense>
      <Footer />
    </div>
  );
}

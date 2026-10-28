import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { Suspense } from "react";
import { hexclaveServerApp } from "@/app/hexclave/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: LayoutProps<"/">) {
  const user = await hexclaveServerApp.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense>
        <Header />
      </Suspense>
      <div className="flex-1 flex px-6 my-6">{children}</div>
      <Footer />
    </div>
  );
}

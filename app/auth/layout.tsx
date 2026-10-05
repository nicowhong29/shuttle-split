import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 my-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}

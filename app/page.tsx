import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <About />
      <Gallery />
    </main>
  );
}

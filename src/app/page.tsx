import Hero from "@/components/Hero";
import ThoughtsSVG from "@/components/ThoughtsSVG";

export default function Home() {
  return (
    <section>
      <Hero />
      <div className="flex justify-center mt-8 h-40 sm:h-64">
        <ThoughtsSVG />
      </div>
    </section>
  );
}

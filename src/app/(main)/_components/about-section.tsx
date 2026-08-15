import { profile } from "@/data/profile";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">01 - About Me</p>
        <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Creating products that are easy to use, helpful, and beautifully designed.
        </h2>
        <div className="mt-12 max-w-2xl">
          <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
        </div>
      </div>
    </section>
  );
}

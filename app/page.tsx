import Footer from "@/components/Footer";
import GuideBlock, { type Tone } from "@/components/GuideBlock";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { content, type Group } from "@/lib/data";

// The "levels" group sits on navy; the others alternate white and light grey.
function toneFor(group: Group, index: number): Tone {
  if (group.id === "levels") return "navy";
  return index % 2 === 0 ? "white" : "mist";
}

function GroupHeader({ group, dark }: { group: Group; dark: boolean }) {
  return (
    <div className={dark ? "bg-navy text-white" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-4 pb-2 pt-20 text-center sm:px-6 lg:pt-28">
        <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${dark ? "text-gold" : "text-gold-deep"}`}>
          {group.eyebrow}
        </p>
        <h2 className={`mt-3 text-4xl font-semibold tracking-tight sm:text-6xl ${dark ? "text-white" : "text-navy"}`}>
          {group.title}
        </h2>
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-snug sm:text-xl ${dark ? "text-white/70" : "text-muted"}`}>
          {group.intro}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {content.groups.map((group) => (
          <div key={group.id} id={group.id}>
            <GroupHeader group={group} dark={group.id === "levels"} />
            {group.sections.map((sectionId, i) => (
              <GuideBlock
                key={sectionId}
                id={sectionId}
                text={content.sections[sectionId]}
                tone={toneFor(group, i)}
                withVideo={group.video}
                showReviewBadge={content.showReviewBadges}
              />
            ))}
          </div>
        ))}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

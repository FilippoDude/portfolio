import Image from "next/image";
import Link from "next/link";
import ModelCard from "./components/model-card";
import CopyEmail from "./components/copy-email";
import { cutoutOf, getModel, models, ROBLOX_STORE } from "./data";

const gear = models.filter((m) => m.section == "gear");
const other = models.filter((m) => m.section == "other");
// The three strongest pieces, from the best-selling lines
const heroModels = ["jmp-plate-carrier", "nox-tactical-helmet", "hazmat-mask"].map(
  (slug) => getModel(slug)!,
);

const stats = [
  { value: "28", label: "Published Roblox items" },
  { value: "530+", label: "Store favorites" },
  { value: "169", label: "Best seller favorites" },
];

const offers = [
  { label: "Hat / mask", price: "from $30" },
  { label: "PBR gear", price: "from $60" },
  { label: "Uniform set", price: "from $150" },
];

function SectionHead({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-(--line) pb-3">
      <h2 id={id} className="font-display m-0 text-[1.5rem] font-bold uppercase tracking-[0.05em]">
        {title}
      </h2>
      <p className="m-0 text-[0.92rem] text-(--muted)">{note}</p>
    </div>
  );
}

export default function StudioHome() {
  return (
    <>
      <ul className="stage rounded-theme m-0 grid list-none grid-cols-3 items-center gap-2 px-4 py-6 sm:px-10">
        {heroModels.map((m, i) => (
          <li key={m.slug}>
            <Link href={`/3d/${m.slug}`} aria-label={m.name}>
              <Image
                src={cutoutOf(m)}
                unoptimized
                alt=""
                width={900}
                height={900}
                priority
                sizes="(max-width: 1180px) 33vw, 380px"
                className={`h-auto w-full transition-transform duration-300 ease-(--ease-out) hover:-translate-y-1 motion-reduce:transition-none ${i == 1 ? "scale-110" : ""}`}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 items-start gap-8 pt-10 pb-2 md:grid-cols-[1.3fr_1fr]">
        <h1 className="font-display m-0 text-[clamp(2.25rem,4.6vw,3.4rem)] leading-[1.05] font-bold uppercase text-balance">
          Game-ready gear, <span className="text-(--accent)">PBR</span> textured
        </h1>
        <div>
          <p className="m-0 max-w-[52ch] text-(--muted)">
            I&apos;m Filippo, a 3D artist and developer. I make Roblox UGC
            accessories and game props in Blender and Substance Painter, mostly
            tactical, SCP and military roleplay gear.
          </p>
          <dl className="mt-4.5 mb-0 flex flex-wrap gap-7">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-[0.78rem] uppercase tracking-[0.08em] text-(--muted)">
                  {s.label}
                </dt>
                <dd className="font-display m-0 text-[1.6rem] tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section
        aria-labelledby="commissions"
        className="rounded-theme my-16 grid grid-cols-1 items-center gap-5 border border-l-4 border-(--line) border-l-(--accent) bg-(--panel) px-6 py-5.5 md:grid-cols-[1fr_auto]"
      >
        <div>
          <h2
            id="commissions"
            className="font-display m-0 mb-1 text-[1.3rem] font-bold uppercase tracking-[0.04em]"
          >
            Commissions open
          </h2>
          <p className="m-0 text-(--muted)">
            Send a reference image. 50% upfront, two revision rounds, delivered
            ready for Roblox Studio.
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {offers.map((o) => (
            <li key={o.label} className="rounded-theme min-w-[118px] border border-(--line) px-3 py-2">
              <span className="block text-[0.74rem] uppercase tracking-[0.08em] text-(--muted)">
                {o.label}
              </span>
              <b className="font-spec text-base font-medium">{o.price}</b>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work" className="my-24 scroll-mt-6">
        <SectionHead
          id="work"
          title="Gear"
          note="Low-poly avatar accessories with PBR maps. Open any piece to spin it in 3D."
        />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4.5 p-0">
          {gear.map((m) => (
            <li key={m.slug} className="flex">
              <ModelCard model={m} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other" className="my-24">
        <SectionHead id="other" title="Props & branding" note="Models made for my own apps and sites." />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4.5 p-0">
          {other.map((m) => (
            <li key={m.slug} className="flex">
              <ModelCard model={m} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="hire"
        className="my-24 grid scroll-mt-6 grid-cols-1 gap-12 md:grid-cols-2"
      >
        <div>
          <h2 className="font-display m-0 mb-2 text-[1.05rem] font-bold uppercase tracking-[0.05em]">
            Also a developer
          </h2>
          <p className="text-(--muted)">
            I build the web side too: React, Next.js, Angular and Node, 3D
            viewers in Three.js like the one on these pages, and Android apps in
            Flutter and Kotlin.
          </p>
          <ul className="m-0 pl-4.5 text-(--muted)">
            <li>
              <Link href="/projects">Web and app projects</Link>
            </li>
            <li>
              <a href="https://infinitybar.filippodude.com/" target="_blank" rel="noopener">
                Infinity Bar
              </a>
              , an interactive 3D site
            </li>
            <li>
              <a href={ROBLOX_STORE} target="_blank" rel="noopener">
                My Roblox store
              </a>
              , with all 28 published items
            </li>
          </ul>
        </div>
        <div>
          <h2
            id="hire"
            className="font-display m-0 mb-2 text-[1.05rem] font-bold uppercase tracking-[0.05em]"
          >
            Hire me
          </h2>
          <p className="m-0 text-(--muted)">
            Tell me what you need, your deadline and a reference. I reply within
            a day, in English or Italian.
          </p>
          <CopyEmail />
        </div>
      </section>
    </>
  );
}

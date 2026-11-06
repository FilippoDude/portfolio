import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ViewerPanel from "../components/viewer-panel";
import { EMAIL, getModel, models } from "../data";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const model = getModel((await params).slug);
  if (!model) return {};
  return {
    title: model.name,
    description: model.description,
    openGraph: {
      title: `${model.name} · Filippo Grochala 3D`,
      description: model.description,
      images: [{ url: model.render, width: model.renderWidth, height: model.renderHeight }],
    },
  };
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-(--line) py-2 text-[0.88rem] last:border-b-0">
      <dt className="text-[0.74rem] uppercase tracking-[0.08em] text-(--muted)">{label}</dt>
      <dd className="font-spec m-0 text-right">{children}</dd>
    </div>
  );
}

export default async function ModelPage({ params }: { params: Params }) {
  const model = getModel((await params).slug);
  if (!model) notFound();

  const index = models.indexOf(model);
  const prev = models[(index - 1 + models.length) % models.length];
  const next = models[(index + 1) % models.length];
  const mailSubject = encodeURIComponent(`Commission: something like the ${model.name}`);

  return (
    <article className="pt-2">
      <Link href="/3d#work" className="text-[0.9rem] text-(--muted) hover:text-(--fg)">
        ← All work
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ViewerPanel file={model.file} name={model.name} rotation={model.rotation} />

        <div>
          <p className="font-spec m-0 text-[0.75rem] uppercase tracking-[0.08em] text-(--accent)">
            {model.kind}
          </p>
          <h1 className="font-display mt-1 mb-1 text-[clamp(1.9rem,4vw,2.8rem)] leading-tight font-bold uppercase">
            {model.name}
          </h1>
          <p className="m-0 text-(--muted)">{model.variant}</p>
          <p className="mt-4">{model.description}</p>

          <dl className="mt-5 mb-0 rounded-theme border border-(--line) bg-(--panel) px-4 py-1">
            <Spec label="Tris">{model.tris.toLocaleString("en-US")}</Spec>
            <Spec label="Made with">{model.tools.join(", ")}</Spec>
            <Spec label="Format">GLB, textures embedded</Spec>
            {model.store ? <Spec label="Store">{model.store}</Spec> : null}
          </dl>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}?subject=${mailSubject}`}
              className="rounded-theme bg-(--accent) px-3.5 py-2.5 text-[0.9rem] font-semibold text-(--accent-ink) no-underline hover:brightness-110"
            >
              Commission something similar
            </a>
            {model.link ? (
              <a
                href={model.link.href}
                className="rounded-theme border border-(--line) px-3.5 py-2.5 text-[0.9rem] no-underline hover:border-(--accent)"
              >
                {model.link.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <figure className="mx-0 mt-12 mb-0">
        <Image
          src={model.render}
          alt={`${model.name}, ${model.variant}, rendered in Blender`}
          width={model.renderWidth}
          height={model.renderHeight}
          sizes="(max-width: 760px) 100vw, 720px"
          className="h-auto w-full max-w-[720px] rounded-theme border border-(--line)"
        />
        <figcaption className="mt-2 text-[0.82rem] text-(--muted)">{model.renderNote}</figcaption>
      </figure>

      <nav
        aria-label="More models"
        className="mt-12 flex flex-wrap justify-between gap-4 border-t border-(--line) pt-5"
      >
        <Link href={`/3d/${prev.slug}`} className="no-underline hover:text-(--accent)">
          <span className="block text-[0.74rem] uppercase tracking-[0.08em] text-(--muted)">
            Previous
          </span>
          ← {prev.name}
        </Link>
        <Link href={`/3d/${next.slug}`} className="text-right no-underline hover:text-(--accent)">
          <span className="block text-[0.74rem] uppercase tracking-[0.08em] text-(--muted)">
            Next
          </span>
          {next.name} →
        </Link>
      </nav>
    </article>
  );
}

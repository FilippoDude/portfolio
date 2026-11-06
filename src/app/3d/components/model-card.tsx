import Image from "next/image";
import Link from "next/link";
import { cutoutOf, Model3d } from "../data";

export default function ModelCard({ model }: { model: Model3d }) {
  return (
    <article className="rounded-theme group relative flex w-full flex-col overflow-hidden border border-(--line) bg-(--panel) transition-colors duration-200 hover:border-(--accent)">
      <figure className="stage m-0 aspect-square overflow-hidden">
        <Image
          src={cutoutOf(model)}
          // Served as-is: re-rendered cutouts keep their URL, and the optimizer would keep serving the old one
          unoptimized
          alt={`${model.name}, ${model.variant}`}
          width={900}
          height={900}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="h-full w-full object-contain p-4 transition-transform duration-300 ease-(--ease-out) group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </figure>
      <div className="flex flex-1 flex-col gap-1 px-4 pt-3.5 pb-4">
        <p className="font-spec m-0 text-[0.72rem] uppercase tracking-[0.08em] text-(--accent)">
          {model.kind}
        </p>
        <h3 className="m-0 text-[1.02rem] font-semibold">
          {/* Stretched link: the whole card is clickable, but only one element is focusable */}
          <Link
            href={`/3d/${model.slug}`}
            className="no-underline after:absolute after:inset-0 after:content-['']"
          >
            {model.name}
          </Link>
        </h3>
        <p className="m-0 text-[0.88rem] text-(--muted)">{model.variant}</p>
        <dl className="mt-2.5 mb-0 grid gap-1 border-t border-(--line) pt-2.5">
          <div className="flex justify-between gap-3 text-[0.82rem]">
            <dt className="text-[0.72rem] uppercase tracking-[0.08em] text-(--muted)">Tris</dt>
            <dd className="font-spec m-0 text-right tabular-nums">
              {model.tris.toLocaleString("en-US")}
            </dd>
          </div>
          {model.store ? (
            <div className="flex justify-between gap-3 text-[0.82rem]">
              <dt className="text-[0.72rem] uppercase tracking-[0.08em] text-(--muted)">Store</dt>
              <dd className="font-spec m-0 text-right">{model.store}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  );
}

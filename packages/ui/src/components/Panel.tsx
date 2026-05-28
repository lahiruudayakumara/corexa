import type { PropsWithChildren } from "react";

export function Panel({
  children,
  title,
}: PropsWithChildren<{ title: string }>): JSX.Element {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-sm uppercase tracking-[0.24em] text-slate-300/60">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type FeatureProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  align?: "left" | "right";
};

export default function FeatureSection({
  eyebrow,
  title,
  description,
  bullets,
  align = "left",
}: FeatureProps) {
  const isReverse = align === "right";

  return (
    <section className="bg-white">
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:items-center md:py-16 ${
          isReverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600">{description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="h-56 rounded-2xl border border-dashed border-slate-200 bg-slate-50" />
        </div>
      </div>
    </section>
  );
}

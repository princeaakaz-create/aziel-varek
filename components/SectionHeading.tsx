import Ornament from './Ornament';

export default function SectionHeading({
  eyebrow,
  title,
  sub
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-4 font-display text-[12px] font-medium uppercase tracking-[0.4em] text-turquoise text-glow">
          {eyebrow}
        </p>
      )}
      <h2 className="gold-text font-deco text-4xl font-bold leading-tight md:text-6xl">
        {title}
      </h2>
      <Ornament className="mt-6" />
      {sub && (
        <p className="mx-auto mt-6 max-w-xl text-[19px] italic leading-relaxed text-ivory/85 text-glow">
          {sub}
        </p>
      )}
    </div>
  );
}
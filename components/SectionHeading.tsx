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
      {eyebrow && <p className="label mb-4 text-glow">{eyebrow}</p>}
      <h2 className="heading text-4xl leading-tight md:text-6xl">{title}</h2>
      <Ornament className="mt-6" />
      {sub && (
        <p className="mx-auto mt-6 max-w-xl text-[21px] italic leading-relaxed text-ivory/85 text-glow">
          {sub}
        </p>
      )}
    </div>
  );
}
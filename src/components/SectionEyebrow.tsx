export function SectionEyebrow({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow__number">{number}</span>
      <span className="section-eyebrow__line" />
      <span>{children}</span>
    </div>
  );
}

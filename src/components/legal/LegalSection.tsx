interface LegalSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function LegalSection({
  number,
  title,
  children,
}: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">
        <span className="mr-2">{number}.</span>
        {title}
      </h2>

      <div className="space-y-3 text-sm leading-7 text-muted">
        {children}
      </div>
    </section>
  );
}

export default LegalSection;
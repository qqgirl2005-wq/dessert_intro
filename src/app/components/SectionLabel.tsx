export default function SectionLabel({ no, en }: { no: string; en: string }) {
  return (
    <p className="font-display flex items-center gap-3 text-sm italic text-berry">
      <span className="not-italic tabular-nums">{no}</span>
      <span className="h-px w-8 bg-berry" />
      {en}
    </p>
  );
}

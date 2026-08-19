interface HomeSectionHeaderProps {
  label: string;
  title: string;
}

export default function HomeSectionNew({
  label,
  title,
}: HomeSectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-[#2563EB]">
        {label}
      </p>

      <h2 className="mt-3 text-[36px] font-bold text-[#111827]">{title}</h2>
    </div>
  );
}

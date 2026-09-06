interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 ${centered ? "text-center" : ""} ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

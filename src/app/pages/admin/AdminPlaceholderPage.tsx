export default function AdminPlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
      <h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#2B2B2B]">{title}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6B7280]">{description}</p>
      <p className="mt-8 rounded-2xl bg-[#FCFAF7] px-5 py-4 text-[14px] font-medium text-[#4B5563]">
        Fitur pengelolaan akan ditambahkan pada sprint berikutnya.
      </p>
    </section>
  );
}

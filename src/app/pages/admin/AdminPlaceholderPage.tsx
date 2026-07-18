export default function AdminPlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-3xl border border-[#D8E4DF] bg-white p-6 sm:p-8">
      <h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#173F57]">{title}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5F6F72]">{description}</p>
      <p className="mt-8 rounded-2xl bg-[#FFF9EC] px-5 py-4 text-[14px] font-medium text-[#49636A]">
        Fitur pengelolaan akan ditambahkan pada sprint berikutnya.
      </p>
    </section>
  );
}

import { useNavigate } from "react-router";
import MainContent from "../components/layout/MainContent";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <MainContent offsetHeader>
      <section className="min-h-[60vh] py-20 lg:py-24 bg-[#FCFAF7] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#F46B35] text-[0.78rem] font-semibold uppercase tracking-widest mb-3">404</div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-[#2B2B2B] tracking-[-0.025em]">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mt-4 text-[#6B7280] text-[0.95rem]">
            Halaman yang Anda cari tidak tersedia.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 rounded-xl bg-[#F46B35] hover:bg-[#d85a2a] text-white text-[13.5px] font-semibold transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </section>
    </MainContent>
  );
}

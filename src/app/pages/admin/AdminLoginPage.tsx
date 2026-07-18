import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthProvider";
import KragilanLogo from "../../components/brand/KragilanLogo";

type LoginLocationState = { from?: string };

export default function AdminLoginPage() {
  const { session, loading: sessionLoading, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = (location.state as LoginLocationState | null)?.from || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!sessionLoading && session) {
    return <Navigate to={destination} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const { error } = await signIn(email.trim(), password);
    if (error) {
      setMessage("Email atau kata sandi tidak sesuai. Silakan coba lagi.");
      setSubmitting(false);
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main
      className="min-h-screen bg-[#FFF9EC] px-4 py-10 flex items-center justify-center"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <section className="w-full max-w-md rounded-3xl border border-[#D8E4DF] bg-white p-6 shadow-[0_16px_50px_rgba(43,43,43,0.08)] sm:p-9">
        <div className="mb-8">
          <div className="mb-5 flex items-center justify-between gap-4"><KragilanLogo /><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DDEFE8] text-[#0D6F6B]"><LockKeyhole size={21} aria-hidden="true" /></div></div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#0D6F6B]">
            Administrasi
          </p>
          <h1 className="mt-2 text-[1.8rem] font-bold tracking-[-0.025em] text-[#173F57]">
            Masuk Admin
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5F6F72]">
            Masukkan email dan kata sandi administrator Padukuhan Kragilan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-[14px] font-semibold text-[#294B55]">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#C8D5D0] px-4 text-[15px] outline-none transition focus:border-[#0D6F6B] focus:ring-2 focus:ring-[#0D6F6B]/15"
              placeholder="admin@contoh.id"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-[14px] font-semibold text-[#294B55]">
              Kata sandi
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#C8D5D0] px-4 pr-12 text-[15px] outline-none transition focus:border-[#0D6F6B] focus:ring-2 focus:ring-[#0D6F6B]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#5F6F72]"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {message && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || sessionLoading}
            className="min-h-12 w-full rounded-xl bg-[#0D6F6B] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#095B58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sedang masuk…" : "Masuk"}
          </button>
        </form>
      </section>
    </main>
  );
}

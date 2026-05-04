import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { connectSocket } from "@/services/sockets/socket";
import { initFcm } from "@/services/firebase/fcm.service";
import { useAuth } from "@/auth/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type IconProps = {
  className?: string;
};

const logoSrc = "/logo/naseeb.png";

const MailIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m5.25 7.25 6.75 5 6.75-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M7.25 10.25h9.5v8H7.25v-8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 10.25v-2.1a3 3 0 0 1 6 0v2.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 10.75v5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 8h.01"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3.75 5.75 6.1v5.35c0 4.05 2.55 7.7 6.25 8.8 3.7-1.1 6.25-4.75 6.25-8.8V6.1L12 3.75Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.4 12.2 11 13.8l3.6-3.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const BoltIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="m13.25 2.75-7 11h5l-.5 7.5 7-11h-5l.5-7.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 19V8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 19V5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19 19v-8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M4 19.25h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const accessBadges = [
  { label: "Secure Access", Icon: ShieldIcon },
  { label: "Real-time Data", Icon: BoltIcon },
  { label: "Full Reporting", Icon: ChartIcon },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, status } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const session = await login(values);
      connectSocket(session.accessToken);
      void initFcm(() => undefined);
      const destination =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname ?? "/";
      navigate(destination === "/login" ? "/" : destination, { replace: true });
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Unable to login",
      });
    }
  };

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid min-h-screen bg-background text-ink lg:grid-cols-[42%_58%]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-primary text-white lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_32%),linear-gradient(180deg,rgba(14,58,43,0)_45%,rgba(61,143,101,0.58)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
        <div className="relative z-10 flex min-h-screen flex-col px-[8%] py-7">
          <div className="flex items-center gap-5">
            <img
              src={logoSrc}
              alt="Naseeb"
              className="h-[70px] w-[70px] object-cover"
            />
            <div>
              <p className="text-[34px] font-extrabold leading-none tracking-[-0.01em] text-white">
                Naseeb
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.32em] text-white/55">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-end">
            <section className="mb-[15vh] max-w-[480px]">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-white/52">
                Agricultural Exchange Platform
              </p>
              <h1 className="mt-7 text-[44px] font-extrabold leading-[1.16] tracking-[-0.01em] text-white">
                Manage every deal with clarity
              </h1>
              <p className="mt-7 max-w-[420px] text-[19px] font-medium leading-9 text-white/68">
                A centralised platform for Naseeb's team to oversee listings,
                deals, payments, and traders - all in one place.
              </p>
            </section>

            <div className="mb-3 flex flex-wrap gap-4">
              {accessBadges.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.13] px-5 text-sm font-bold text-white/[0.82]"
                >
                  <Icon className="h-4 w-4 text-secondary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-16">
        <section className="w-full max-w-[542px]">
          <div className="mb-10 flex items-center gap-4 lg:hidden">
            <img
              src={logoSrc}
              alt="Naseeb"
              className="h-14 w-14 object-cover"
            />
            <div>
              <p className="text-3xl font-extrabold leading-none text-ink">
                Naseeb
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-muted">
                Admin Portal
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[40px] font-extrabold leading-tight tracking-[-0.01em] text-ink">
              Sign in
            </h2>
            <p className="mt-2 text-lg font-medium text-muted">
              Enter your credentials to access the admin portal
            </p>
          </div>

          <form className="mt-12 space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-3 block text-base font-extrabold uppercase tracking-[0.02em] text-muted">
                Email Address
              </span>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="email"
                  className="h-[62px] w-full rounded-[14px] border border-[rgb(var(--color-border))] bg-white pl-14 pr-5 text-base font-semibold text-ink shadow-[0_1px_4px_rgba(20,24,38,0.08)] outline-none transition focus:border-primary focus:ring-4 focus:ring-brand-200/70"
                  {...register("email")}
                />
              </div>
              {errors.email ? (
                <p className="mt-2 text-sm font-medium text-red-700">
                  {errors.email.message}
                </p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-3 block text-base font-extrabold uppercase tracking-[0.02em] text-muted">
                Password
              </span>
              <div className="relative">
                <LockIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="h-[62px] w-full rounded-[14px] border border-[rgb(var(--color-border))] bg-white pl-14 pr-24 text-base font-semibold text-ink shadow-[0_1px_4px_rgba(20,24,38,0.08)] outline-none transition focus:border-primary focus:ring-4 focus:ring-brand-200/70"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400 transition hover:text-primary"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-2 text-sm font-medium text-red-700">
                  {errors.password.message}
                </p>
              ) : null}
            </label>

            {errors.root?.message ? (
              <p className="rounded-[14px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errors.root.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[66px] w-full rounded-[16px] bg-[linear-gradient(90deg,rgb(var(--color-primary))_0%,rgb(var(--color-primary-light))_100%)] px-5 text-[20px] font-extrabold text-white shadow-[0_18px_38px_rgba(29,83,61,0.16)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In to Portal"}
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4 rounded-[14px] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(20,24,38,0.05)]">
            <InfoIcon className="h-5 w-5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="text-base font-extrabold text-muted">
                Demo Credentials
              </p>
              <p className="mt-1 break-words font-mono text-sm font-bold tracking-[0.04em] text-muted">
                admin@naseeb.pk <span className="mx-3 text-slate-400">.</span>{" "}
                password
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-semibold text-slate-300">
            &copy; 2026 Naseeb Agricultural Exchange. All rights reserved.
          </p>
        </section>
      </main>
    </div>
  );
};

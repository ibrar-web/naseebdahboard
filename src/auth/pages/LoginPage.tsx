import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('broker@naseeb.local');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to login');
    }
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,_rgba(94,133,87,0.18),_transparent_45%),linear-gradient(135deg,#f5f1e8_0%,#ffffff_60%,#eef4eb_100%)]">
      <div className="m-auto grid w-full max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] bg-ink p-10 text-white shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Naseeb AgriTech</p>
          <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
            Broker control room for marketplace approvals, operations, and deal oversight.
          </h1>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">Internal Roles</p>
              <p className="mt-3 text-xl font-semibold">Broker and Agent</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">External Users</p>
              <p className="mt-3 text-xl font-semibold">Buyer and Seller data only</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-white p-8 shadow-panel">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Secure Sign-In</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink">Admin dashboard access</h2>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Email</span>
              <input
                className="w-full rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3 outline-none transition focus:border-brand-400"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Password</span>
              <input
                type="password"
                className="w-full rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3 outline-none transition focus:border-brand-400"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Login to Naseeb Dashboard
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

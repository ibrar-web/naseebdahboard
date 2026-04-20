import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { connectSocket } from '@/services/sockets/socket';
import { initFcm } from '@/services/firebase/fcm.service';
import { useAuth } from '@/auth/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'broker@naseeb.local',
      password: 'Password123!',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const session = await login(values);
      connectSocket(session.accessToken);
      void initFcm(() => undefined);
      navigate('/', { replace: true });
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Unable to login',
      });
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
          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                className="w-full rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3 outline-none transition focus:border-brand-400"
                {...register('email')}
              />
              {errors.email ? <p className="mt-2 text-sm text-red-700">{errors.email.message}</p> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Password</span>
              <input
                type="password"
                className="w-full rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3 outline-none transition focus:border-brand-400"
                {...register('password')}
              />
              {errors.password ? <p className="mt-2 text-sm text-red-700">{errors.password.message}</p> : null}
            </label>
            {errors.root?.message ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.root.message}</p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              {isSubmitting ? 'Authorizing...' : 'Login to Naseeb Dashboard'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

interface AppFallbackProps {
  title?: string;
  message?: string;
  actionLabel?: string;
}

export const AppFallback = ({
  title = 'Something went wrong',
  message = 'The dashboard hit an unexpected error. Reload the page or return to the last stable screen.',
  actionLabel = 'Reload dashboard',
}: AppFallbackProps) => (
  <div className="flex min-h-screen items-center justify-center bg-sand px-6">
    <div className="w-full max-w-xl rounded-[32px] bg-white p-8 shadow-panel">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-600">System Fallback</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">{title}</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        {actionLabel}
      </button>
    </div>
  </div>
);

import { Link } from '@tanstack/react-router';

export function NotFoundScreen() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-bg-secondary via-bg to-bg" />

      <div className="relative">
        <span className="block font-mono text-[0.875rem] tracking-[0.5em] text-muted uppercase">
          Error
        </span>
        <p className="mt-4 font-mono text-[10rem]/[0.85] font-bold tracking-tighter text-foreground tabular-nums">
          404
        </p>
        <p className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center font-mono text-sm tracking-widest text-muted-foreground/30">
          NOT_FOUND
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-lg font-medium text-foreground">
          This page slipped through the cracks.
        </p>
        <p className="mt-1 max-w-xs text-center text-sm text-muted">
          The link you followed might be outdated or the page no longer exists.
        </p>
      </div>

      <Link
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        to="/"
      >
        Return home
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </main>
  );
}

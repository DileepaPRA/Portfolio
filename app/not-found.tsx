import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#060c1a", color: "#dce4f5" }}
    >
      <p className="font-mono text-sm text-teal mb-2">&gt;_ error: 404</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="font-mono text-muted text-sm max-w-md mb-8">
        The requested system path does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl font-mono text-sm font-bold bg-teal text-[#060c1a] hover:shadow-[0_0_24px_rgba(0,212,180,0.3)] transition-all hover:scale-105"
      >
        Return to Safety
      </Link>
    </div>
  );
}

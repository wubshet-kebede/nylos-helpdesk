import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* ───────────────── Brand ───────────────── */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-lg shadow-slate-950/10 transition duration-300 group-hover:scale-105">
            <span className="text-lg font-bold text-white">N</span>
          </div>

          <div className="leading-none">
            <span className="block text-lg font-bold tracking-tight text-slate-950">
              Nylos
            </span>

            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Helpdesk
            </span>
          </div>
        </Link>

        {/* ───────────────── Desktop Navigation ───────────────── */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 md:flex">
          <Link
            to="/"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm"
          >
            Home
          </Link>

          <a
            href="#features"
            className="rounded-full px-5 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-950"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="rounded-full px-5 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-950"
          >
            How it works
          </a>

          <a
            href="#about"
            className="rounded-full px-5 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-950"
          >
            About
          </a>
        </div>

        {/* ───────────────── Desktop Actions ───────────────── */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
          >
            Get started
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 10H16M11 5L16 10L11 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* ───────────────── Mobile Menu Button ───────────────── */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 7H20M4 12H20M4 17H20" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* ───────────────── Mobile Navigation ───────────────── */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 pb-6 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              Home
            </Link>

            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#workflow"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              How it works
            </a>

            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              About
            </a>

            <div className="my-2 h-px bg-slate-100" />

            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

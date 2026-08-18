import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#fbfbfa] text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center sm:col-span-2 sm:text-left lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900 bg-slate-950 shadow-sm transition-colors duration-200 group-hover:bg-slate-900">
                <span className="text-lg font-bold text-white">N</span>
              </div>

              <div className="leading-none">
                <span className="block text-lg font-extrabold tracking-tight text-slate-900">
                  Nylos
                </span>

                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Helpdesk
                </span>
              </div>
            </Link>

            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-slate-500 sm:mx-0">
              A modern helpdesk platform designed to help teams organize, track,
              and resolve customer issues efficiently.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
              <a
                href="https://github.com/wubshet-kebede"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/wubshet-kebede"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#workflow"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  How it works
                </a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Sign in
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Get started
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#privacy"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="#terms"
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-12 h-px bg-slate-200/80" />
        <div className="flex flex-col items-center gap-3 text-center text-xs font-medium text-slate-400 sm:flex-row sm:justify-between sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Nylos Helpdesk. All rights
            reserved.
          </p>

          <p className="tracking-tight">Built for better support workflows.</p>
        </div>
      </div>
    </footer>
  );
}

import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import WorkflowSection from "../components/landing/WorkflowSection";
import CTASection from "../components/landing/CTASection";
export default function LandingPage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSection />

      {/* =====================================================
          PRODUCT VALUE
      ====================================================== */}
      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-slate-950">Clear</p>
              <p className="mt-2 text-sm text-slate-500">
                Ownership for every issue
              </p>
            </div>

            <div className="border-slate-200 sm:border-x">
              <p className="text-3xl font-bold text-slate-950">Structured</p>
              <p className="mt-2 text-sm text-slate-500">
                Workflows from open to closed
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-950">Secure</p>
              <p className="mt-2 text-sm text-slate-500">
                Access built around authenticated users
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <WorkflowSection />

      {/* =====================================================
          CTA
      ====================================================== */}
      <CTASection />
    </div>
  );
}

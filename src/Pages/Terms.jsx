import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  const lastUpdated = "June 06, 2026";

  const provisions = [
    {
      id: "account-terms",
      number: "01",
      title: "Account Provisioning & Security",
      description: "Rules governing the authorization, ownership, and operational credentials of instances hosted on our architecture.",
      details: "To access our deployment systems, users must establish verified credentials. You maintain absolute liability for all operations, scripts, or API requests executing under your authentication tokens. Any unauthorized intrusion or metric anomaly must be reported to our root team immediately."
    },
    {
      id: "acceptable-use",
      number: "02",
      title: "Acceptable System Utilization",
      description: "Strict operational boundaries preventing infrastructure degradation, network attacks, or systemic resource exploitation.",
      details: "You agree not to deploy loops or automated sequences intended to disrupt server stability, test unauthorized penetration hooks, bypass multi-tenant isolation borders, or route malicious payloads. Systematic scraping, excessive concurrent polling, or pipeline flooding outside of your allocated tier metrics will result in automated system rate-limiting or outright account suspension."
    },
    {
      id: "billing-payments",
      number: "03",
      title: "Commercial Terms & Stripe Processing",
      description: "Our core frameworks for handling subscriptions, localized merchant operations, and recurring software metrics.",
      details: "All financial transactions are handled directly through our secure merchant processor (Stripe). Subscriptions, fixed resource packages, or proof-of-work modules are billed transparently on a pre-pay schedule based on your current tier. Delinquent accounts will automatically lock sandbox deployments after a 7-day grace period."
    },
    {
      id: "liability-limits",
      number: "04",
      title: "Limitation of Liability & SLA",
      description: "Legal documentation regarding runtime performance guarantees and resource constraints.",
      details: "SoftRiseHub provides services on an 'as-is' and 'as-available' basis. We exclude all implied warranties of merchantability or system fitness for a specific engineering objective. In no event shall our engineering matrix be liable for accidental data dropouts, cluster downtime, profit drops, or third-party API dependencies failing in production."
    }
  ];

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 text-slate-900 font-sans antialiased px-4 sm:px-6 lg:px-8 py-20 selection:bg-slate-900 selection:text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER BLOCK */}
        <div className="w-full border-b border-slate-200 pb-10 mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 block mb-3">
            / Corporate Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
            <span>DOCUMENT_REF: SRH-TOS-2026</span>
            <span className="text-slate-300">•</span>
            <span>LAST_REVISED: {lastUpdated}</span>
          </div>
        </div>

        {/* PROVISIONS GRID SYSTEM */}
        <div className="w-full space-y-12 mb-16">
          {provisions.map((term) => (
            <section
              key={term.id}
              id={term.id}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 first:pt-0 border-t border-slate-200/60 first:border-0"
            >
              {/* Sidebar Identity Column */}
              <div className="md:col-span-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">
                    {term.number}
                  </span>
                  <div>
                    <h2 className="text-base font-black text-slate-900 tracking-tight">
                      {term.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-500 font-normal leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Structural Narrative Box */}
              <div className="md:col-span-8 bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-sm text-left">
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {term.details}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* ACTION PANEL */}
        <div className="w-full bg-white border border-slate-200 rounded-xl p-6 sm:p-8 text-left shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Need custom enterprise SLA parameters?
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
              If your corporate structure or production environment requires isolated database clusters, custom liability bounds, or legal modifications, contact our legal node.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/contact"
              className="inline-block px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition active:scale-[0.98]"
            >
              Request SLA
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;
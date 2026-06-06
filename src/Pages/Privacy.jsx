import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  const lastUpdated = "June 06, 2026";

  const sections = [
    {
      id: "data-collection",
      number: "01",
      title: "Data Collection & Telemetry",
      description: "We collect specific technical parameters required to initialize, secure, and maintain your digital infrastructure inside our systems.",
      items: [
        "Account Credentials: Name, email address, password hashes, phone registration data, and deployment region.",
        "System Telemetry: IP addresses, browser client configurations, access logs, routing parameters, and API performance request records.",
        "Payment Parameters: Transmitted directly to our commercial processing layer (Stripe). We do not record raw financial account details on our core instances."
      ]
    },
    {
      id: "data-processing",
      number: "02",
      title: "Processing Architecture",
      description: "Your information is parsed strictly to uphold platform mechanics, computational security, and billing verification rules.",
      items: [
        "Provisioning and automating instances, services, and live developer accounts.",
        "Detecting runtime anomalies, systemic errors, multi-tenant breaches, and fraudulent payment activities.",
        "Syncing real-time system alerts, critical maintenance updates, and webhook callbacks."
      ]
    },
    {
      id: "data-retention",
      number: "03",
      title: "Retention & Purging Policies",
      description: "We store ledger information only as long as necessary to fulfill active structural services or legal data enforcement criteria.",
      items: [
        "Active user profiles are preserved continuously until a complete termination command is initiated.",
        "Server logs and operational infrastructure telemetry automatically cycle and overwrite after 90 days.",
        "Database records purged by developers will be completely dropped from active clusters, with cold-storage backup sets cycling within 30 days."
      ]
    },
    {
      id: "user-rights",
      number: "04",
      title: "Developer & Client Rights",
      description: "You maintain total authority over your operational dataset. You can invoke standard actions directly inside your user dashboard console.",
      items: [
        "Request full export files of your collected metadata, system objects, and transactional history.",
        "Modify, correct, or update personal parameters and regional settings instantly.",
        "Trigger a complete account drop sequence to clear all non-statutory ledger footprints from our global systems."
      ]
    }
  ];

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 text-slate-900 font-sans antialiased px-4 sm:px-6 lg:px-8 py-20 selection:bg-slate-900 selection:text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER BLOCK */}
        <div className="w-full border-b border-slate-200 pb-10 mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 block mb-3">
            / Legal Documentation
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Privacy Architecture Policy
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
            <span>DOCUMENT_REF: SRH-PRV-2026</span>
            <span className="text-slate-300">•</span>
            <span>LAST_MODIFIED: {lastUpdated}</span>
          </div>
        </div>

        {/* POLICY GRID ROW MATRIX */}
        <div className="w-full space-y-12 mb-16">
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 first:pt-0 border-t border-slate-200/60 first:border-0"
            >
              {/* Numerical & Title Column */}
              <div className="md:col-span-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">
                    {sec.number}
                  </span>
                  <div>
                    <h2 className="text-base font-black text-slate-900 tracking-tight">
                      {sec.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-500 font-normal leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Items Bullet Column */}
              <div className="md:col-span-8 bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
                <ul className="space-y-3.5">
                  {sec.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-xs text-slate-600 font-normal leading-relaxed">
                      <span className="text-blue-600 font-bold font-mono mt-0.5 shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* SUPPORTING FOOTER CONTACT SECTION */}
        <div className="w-full bg-white border border-slate-200 rounded-xl p-6 sm:p-8 text-left shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Questions regarding security or data pipelines?
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
              Our infrastructure and compliance team is ready to provide precise evaluations regarding system safeguards, regional instances, or security rules.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/contact"
              className="inline-block px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition active:scale-[0.98]"
            >
              Contact Node
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
"use client";

import { Shell } from "@/components/layout/Shell";
import { DiagnosticForm } from "@/components/coo/DiagnosticForm";

export default function COODiagnosticPage() {
  return (
    <Shell>
      <div className="max-w-4xl space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            AI-COO Diagnostic
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900">
            Capture your operational reality
          </h2>
          <p className="mt-2 text-gray-600">
            Share recent throughput, cost, reliability and process signals. AI-COO will
            combine them with tailored heuristics and best practices for SMEs.
          </p>
        </div>
        <DiagnosticForm />
      </div>
    </Shell>
  );
}


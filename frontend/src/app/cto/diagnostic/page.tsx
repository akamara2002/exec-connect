"use client";

import { Shell } from "@/components/layout/Shell";
import { DiagnosticForm } from "@/components/cto/DiagnosticForm";

export default function CTODiagnosticPage() {
  return (
    <Shell>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            CTO Diagnostic
          </h2>
          <p className="mt-2 text-gray-600">
            Assess your technology infrastructure and engineering capabilities.
          </p>
        </div>
        <DiagnosticForm />
      </div>
    </Shell>
  );
}

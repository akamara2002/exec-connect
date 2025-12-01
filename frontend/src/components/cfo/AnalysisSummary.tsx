"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CFOAnalysisOut } from "@/lib/types";

interface AnalysisSummaryProps {
  analysis: CFOAnalysisOut;
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const riskColor =
    analysis.risk_level === "green"
      ? "green"
      : analysis.risk_level === "yellow"
      ? "yellow"
      : "red";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Analysis Summary</CardTitle>
          <Badge variant={riskColor as any}>
            {analysis.risk_level.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Summary</h3>
          <p className="text-muted-foreground">{analysis.summary}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Primary Issue</h3>
          <p className="text-muted-foreground">{analysis.primary_issue}</p>
        </div>
      </CardContent>
    </Card>
  );
}


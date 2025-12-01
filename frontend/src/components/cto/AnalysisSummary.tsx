"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CTOAnalysis } from "@/lib/types";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface AnalysisSummaryProps {
  analysis: CTOAnalysis;
}

const riskColors = {
  low: "bg-green-100 text-green-800 border-green-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  high: "bg-red-100 text-red-800 border-red-300",
};

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Executive Summary</CardTitle>
            <Badge className={riskColors[analysis.risk_level]}>
              {analysis.risk_level.toUpperCase()} Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Primary Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{analysis.primary_issue}</p>
        </CardContent>
      </Card>
    </div>
  );
}


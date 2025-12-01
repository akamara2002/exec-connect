"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CMOAnalysis } from "@/lib/types";

interface AnalysisSummaryProps {
  analysis: CMOAnalysis;
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const getRiskBadgeVariant = (risk: string) => {
    if (risk === "green") return "green";
    if (risk === "yellow") return "yellow";
    return "red";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Executive Summary</CardTitle>
            <Badge variant={getRiskBadgeVariant(analysis.risk_level)}>
              {analysis.risk_level.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Primary Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{analysis.primary_issue}</p>
        </CardContent>
      </Card>
    </div>
  );
}


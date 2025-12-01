"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCfoAnalyses } from "@/lib/api";
import type { CFOAnalysisListItem } from "@/lib/types";
import Link from "next/link";
import { Loader2, ExternalLink } from "lucide-react";

export default function CFOHistoryPage() {
  const [analyses, setAnalyses] = useState<CFOAnalysisListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAnalyses() {
      try {
        const data = await getCfoAnalyses(page, 10);
        setAnalyses(data);
      } catch (err) {
        console.error("Failed to fetch analyses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyses();
  }, [page]);

  if (loading) {
    return (
      <Shell>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">CFO Analyses History</h1>
          <p className="text-gray-600">
            View your past financial diagnostics
          </p>
        </div>

        {analyses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                No analyses found. Run your first diagnostic to see results here.
              </p>
              <Link href="/cfo/diagnostic">
                <Button>Start Diagnostic</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis) => {
              const riskColorClass =
                analysis.risk_level === "green"
                  ? "bg-green-100 text-green-800"
                  : analysis.risk_level === "yellow"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800";

              return (
                <Card key={analysis.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {analysis.primary_issue}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-2">
                          {analysis.summary}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(analysis.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={riskColorClass}>
                          {analysis.risk_level.toUpperCase()}
                        </Badge>
                        <Link href={`/cfo/analysis/${analysis.id}`}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Shell>
  );
}

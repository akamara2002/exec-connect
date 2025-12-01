import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type COOAnalysisOut } from "@/lib/types";
import { AlertCircle, Target, Calendar } from "lucide-react";

interface AnalysisSummaryProps {
  analysis: COOAnalysisOut;
}

function getRiskBadgeVariant(risk: string) {
  switch (risk) {
    case "green":
      return "default";
    case "yellow":
      return "secondary";
    case "red":
      return "destructive";
    default:
      return "secondary";
  }
}

function getRiskColor(risk: string) {
  switch (risk) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  return (
    <Card className="border-0 shadow-premium overflow-hidden animate-slide-up">
      <div className="h-1 bg-gradient-premium"></div>
      <CardHeader className="bg-gradient-premium-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">Operational Summary</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(analysis.created_at).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Badge 
            variant={getRiskBadgeVariant(analysis.risk_level)}
            className="capitalize text-sm px-4 py-2 flex items-center gap-2"
          >
            <span className={`h-2 w-2 rounded-full ${getRiskColor(analysis.risk_level)}`}></span>
            Risk: {analysis.risk_level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div className="rounded-xl bg-muted/50 p-6 border border-border">
          <p className="text-lg leading-relaxed text-foreground">{analysis.summary}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 border border-blue-200 dark:border-blue-800 hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-blue-500 p-2 text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Primary Issue
              </p>
            </div>
            <p className="text-base font-semibold text-foreground">
              {analysis.primary_issue}
            </p>
          </div>
          <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6 border border-purple-200 dark:border-purple-800 hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-purple-500 p-2 text-white">
                <Target className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                Priority Area
              </p>
            </div>
            <p className="text-base font-semibold text-foreground capitalize">
              {analysis.priority_area}
            </p>
          </div>
          <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-6 border border-orange-200 dark:border-orange-800 hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-orange-500 p-2 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                Action Horizon
              </p>
            </div>
            <p className="text-base font-semibold text-foreground">
              Week · Month · Quarter
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


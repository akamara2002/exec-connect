"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Risk } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

interface RisksListProps {
  risks: Risk[];
}

const severityColors = {
  high: "bg-red-100 text-red-800 border-red-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-blue-100 text-blue-800 border-blue-300",
};

export function RisksList({ risks }: RisksListProps) {
  if (risks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Identified Risks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {risks.map((risk, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg">{risk.title}</h4>
                <Badge className={severityColors[risk.severity]}>
                  {risk.severity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{risk.description}</p>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Impact: </span>
                {risk.impact}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/types";
import { Lightbulb, TrendingUp } from "lucide-react";

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-blue-100 text-blue-800 border-blue-300",
};

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg">{rec.title}</h4>
                <Badge className={priorityColors[rec.priority]}>
                  {rec.priority.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3">{rec.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  Category: <span className="font-medium">{rec.category}</span>
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <TrendingUp className="h-4 w-4" />
                  {rec.estimated_impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


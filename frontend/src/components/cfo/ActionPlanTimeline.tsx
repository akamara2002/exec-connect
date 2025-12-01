"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Target } from "lucide-react";
import type { ActionPlan } from "@/lib/types";

interface ActionPlanTimelineProps {
  actionPlan: ActionPlan;
}

export function ActionPlanTimeline({ actionPlan }: ActionPlanTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Action Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">This Week</h3>
            </div>
            <ul className="space-y-2">
              {actionPlan.week.length > 0 ? (
                actionPlan.week.map((action, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No actions</li>
              )}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">This Month</h3>
            </div>
            <ul className="space-y-2">
              {actionPlan.month.length > 0 ? (
                actionPlan.month.map((action, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No actions</li>
              )}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold">This Quarter</h3>
            </div>
            <ul className="space-y-2">
              {actionPlan.quarter.length > 0 ? (
                actionPlan.quarter.map((action, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No actions</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


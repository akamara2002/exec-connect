"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionPlan } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";

interface ActionPlanTimelineProps {
  actionPlan: ActionPlan;
}

export function ActionPlanTimeline({ actionPlan }: ActionPlanTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Action Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* This Week */}
        {actionPlan.week.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">This Week</h3>
            </div>
            <ul className="space-y-2 ml-7">
              {actionPlan.week.map((action, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 mt-1.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* This Month */}
        {actionPlan.month.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-lg">This Month</h3>
            </div>
            <ul className="space-y-2 ml-7">
              {actionPlan.month.map((action, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600 mt-1.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* This Quarter */}
        {actionPlan.quarter.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-lg">This Quarter</h3>
            </div>
            <ul className="space-y-2 ml-7">
              {actionPlan.quarter.map((action, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {actionPlan.week.length === 0 && actionPlan.month.length === 0 && actionPlan.quarter.length === 0 && (
          <p className="text-gray-500 text-center py-4">No action items defined yet.</p>
        )}
      </CardContent>
    </Card>
  );
}


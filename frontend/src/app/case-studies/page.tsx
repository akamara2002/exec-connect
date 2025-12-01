"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, DollarSign, TrendingUp } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies & Results</h1>
          <p className="text-xl text-gray-600">
            Real transformations from real businesses
          </p>
        </div>

        {/* Case Study 1 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Retail Turnaround: RM72K Saved</CardTitle>
                <CardDescription>5-location retail chain | 6-month engagement</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800">AI-COO</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">The Challenge</h4>
                <p className="text-gray-700 text-sm mb-4">
                  A family-owned retail chain with 5 locations was losing RM15,000 per month. 
                  High inventory costs, inefficient operations, and lack of financial visibility 
                  were threatening the business's survival.
                </p>
                <h4 className="font-semibold mb-3">The Solution</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AI-COO diagnostic identified 12 critical operational inefficiencies</li>
                  <li>• Fractional COO implemented inventory optimization system</li>
                  <li>• Renegotiated vendor contracts and improved supplier management</li>
                  <li>• Streamlined operations across all locations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Results</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-gray-700">Before (Monthly Loss)</span>
                    <span className="font-bold text-red-600">-RM15,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">After (Monthly Profit)</span>
                    <span className="font-bold text-green-600">+RM10,000</span>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Inventory costs reduced by 30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Operational efficiency up 20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold">Total savings: RM72,000 (6 months)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Study 2 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Manufacturer: Cash Flow Improved by 30%</CardTitle>
                <CardDescription>Mid-size manufacturing company | 4-month engagement</CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800">AI-CFO</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">The Challenge</h4>
                <p className="text-gray-700 text-sm mb-4">
                  A manufacturing company was struggling with cash flow despite having good sales. 
                  Long payment terms, high inventory levels, and poor working capital management 
                  were constraining growth.
                </p>
                <h4 className="font-semibold mb-3">The Solution</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AI-CFO diagnostic analyzed cash flow patterns</li>
                  <li>• Implemented invoice management and collection process</li>
                  <li>• Optimized inventory levels based on demand forecasting</li>
                  <li>• Negotiated better payment terms with suppliers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Results</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Cash Flow Improvement</span>
                      <span className="font-bold text-blue-600 text-xl">+30%</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Reduced average collection period by 15 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Inventory levels optimized by 25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Working capital improved by RM500K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Study 3 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">SaaS Platform: CAC down 20%, Leads up 35%</CardTitle>
                <CardDescription>Tech startup | 5-month engagement</CardDescription>
              </div>
              <Badge className="bg-purple-100 text-purple-800">AI-CMO</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">The Challenge</h4>
                <p className="text-gray-700 text-sm mb-4">
                  A B2B SaaS startup was spending too much on customer acquisition with low conversion rates. 
                  Marketing channels were not optimized, and there was no clear strategy for growth.
                </p>
                <h4 className="font-semibold mb-3">The Solution</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AI-CMO diagnostic analyzed marketing funnel efficiency</li>
                  <li>• Identified high-performing channels and optimized spend</li>
                  <li>• Improved messaging and targeting based on data insights</li>
                  <li>• Implemented marketing automation and lead nurturing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Results</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <ArrowDown className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-gray-600">Customer Acquisition Cost</span>
                      </div>
                      <span className="font-bold text-green-600 text-xl">-20%</span>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <ArrowUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600">Lead Generation</span>
                      </div>
                      <span className="font-bold text-blue-600 text-xl">+35%</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Conversion rate improved by 15%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Marketing ROI increased by 45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}


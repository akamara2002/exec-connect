"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Brain, Users, Rocket, BookOpen } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">
            Get strategic leadership expertise in 4 simple steps
          </p>
        </div>

        {/* Step 1 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">Share Your SME Profile</CardTitle>
                <CardDescription className="text-base">
                  Tell us about your business, challenges, and goals
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-24">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Enter company details</p>
                  <p className="text-sm text-gray-600">Company name, size, industry, key challenges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Select business stage</p>
                  <p className="text-sm text-gray-600">Survival, Stability, Success, or Scale</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Highlight goals</p>
                  <p className="text-sm text-gray-600">e.g., Raise funding, Improve operations, Grow sales</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Output: Smart SME Snapshot → feeds the AI system</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">AI-Powered Diagnostic Engine</CardTitle>
                <CardDescription className="text-base">
                  Choose your assessment path
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Option A: General Business Diagnostic</CardTitle>
                  <CardDescription>Via Virtual CEO</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Ideal for users unsure where to start. Looks across strategy, operations, marketing, finance, tech, and talent.
                  </p>
                  <p className="text-sm font-medium text-purple-600">
                    Returns: 360° Business Health Score + Recommended Focus Area
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Option B: Specialized CXO Agents</CardTitle>
                  <CardDescription>Choose your expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Ideal for users who know what help they need. Pick from AI-CFO, AI-CMO, AI-COO, or AI-CTO.
                  </p>
                  <p className="text-sm font-medium text-purple-600">
                    Returns: Precision Diagnostic Report + Execution Priorities
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Each agent asks role-specific diagnostics (dynamic questions)</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">Human CXO Match (Optional)</CardTitle>
                <CardDescription className="text-base">
                  Connect with expert advisors based on AI insights
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-24">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Curated CXO list</p>
                  <p className="text-sm text-gray-600">Based on your diagnostic results, get matched with fractional CXOs or advisors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Discovery call</p>
                  <p className="text-sm text-gray-600">Book a call with top matches to discuss your needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Engagement types</p>
                  <p className="text-sm text-gray-600">One-time consultation | Monthly retainer | Project-based</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/cxos">
                <Button>
                  Browse Human CXOs <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">Execute with Impact</CardTitle>
                <CardDescription className="text-base">
                  Implement recommendations with ongoing support
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-24">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Rocket className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Engagement begins</p>
                  <p className="text-sm text-gray-600">Start working with your chosen CXO on implementation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">AI-tracked KPIs</p>
                  <p className="text-sm text-gray-600">Monthly reviews using KPIs from your diagnostic</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Execution resources</p>
                  <p className="text-sm text-gray-600">Access templates, playbooks, and tools for implementation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Layer */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl">Bonus Layer: SME Resource Centre (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Before committing to human CXO, you can browse playbooks, tools, and reports for self-led execution.
              Join SME peer groups or watch curated masterclasses. Upgrade later when ready for human guidance.
            </p>
            <Link href="/ecosystem">
              <Button variant="outline">
                Explore Resource Centre <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Link href="/get-started">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
}


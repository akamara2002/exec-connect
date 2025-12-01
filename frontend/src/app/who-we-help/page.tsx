"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Building, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhoWeHelpPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Who We Help</h1>
          <p className="text-xl text-gray-600">
            Exec Connect is designed for SMEs at every stage of growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Early-Stage SMEs (0–3 years)</CardTitle>
              <CardDescription>Building the foundation for growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Setting up financial systems and controls</li>
                <li>• Establishing go-to-market strategies</li>
                <li>• Building operational processes</li>
                <li>• Preparing for fundraising</li>
              </ul>
              <p className="text-sm font-medium text-blue-600 mb-4">Use Case Example:</p>
              <p className="text-sm text-gray-600">
                "We needed to understand our cash flow better before our first funding round. 
                AI-CFO helped us create proper financial models and prepare investor-ready reports."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Growth-Ready SMEs</CardTitle>
              <CardDescription>Scaling operations and teams</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Optimizing operations for scale</li>
                <li>• Improving marketing ROI</li>
                <li>• Managing growth capital efficiently</li>
                <li>• Building scalable systems</li>
              </ul>
              <p className="text-sm font-medium text-green-600 mb-4">Use Case Example:</p>
              <p className="text-sm text-gray-600">
                "As we grew from 10 to 50 employees, operations became chaotic. 
                AI-COO helped us document processes and build systems that scale."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Family Businesses & Legacy Firms</CardTitle>
              <CardDescription>Modernizing and digitizing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Digital transformation initiatives</li>
                <li>• Modernizing financial systems</li>
                <li>• Improving operational efficiency</li>
                <li>• Strategic planning for succession</li>
              </ul>
              <p className="text-sm font-medium text-purple-600 mb-4">Use Case Example:</p>
              <p className="text-sm text-gray-600">
                "Our family business needed to digitize but didn't know where to start. 
                AI-CTO provided a roadmap that fit our budget and timeline."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <CardTitle>Impact-Focused Entrepreneurs</CardTitle>
              <CardDescription>Building sustainable businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Social impact measurement</li>
                <li>• Sustainable growth strategies</li>
                <li>• Community-focused marketing</li>
                <li>• Balanced financial and impact goals</li>
              </ul>
              <p className="text-sm font-medium text-red-600 mb-4">Use Case Example:</p>
              <p className="text-sm text-gray-600">
                "We wanted to grow while maintaining our social mission. 
                Exec Connect helped us balance profit and purpose with strategic guidance."
              </p>
            </CardContent>
          </Card>
        </div>

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


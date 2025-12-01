"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InsightsPage() {
  const articles = [
    {
      id: 1,
      title: "What is a Fractional CXO?",
      description: "Understanding how fractional executives can transform your business without the full-time cost.",
      date: "2024-01-15",
      category: "Leadership",
    },
    {
      id: 2,
      title: "Why SMEs Need a Strategy Layer, Not Just Staff",
      description: "The critical difference between operational execution and strategic leadership in growing businesses.",
      date: "2024-01-10",
      category: "Strategy",
    },
    {
      id: 3,
      title: "How to Choose Between Full-Time and Fractional Leaders",
      description: "A practical guide to deciding when to hire full-time vs. fractional CXOs for your business.",
      date: "2024-01-05",
      category: "Decision Making",
    },
    {
      id: 4,
      title: "AI-Powered Diagnostics: The Future of Business Consulting",
      description: "How AI is revolutionizing business diagnostics and strategic planning for SMEs.",
      date: "2023-12-28",
      category: "Technology",
    },
    {
      id: 5,
      title: "Case Study: How One SME Saved RM72K with Operational Optimization",
      description: "A deep dive into how proper operational guidance transformed a struggling retail chain.",
      date: "2023-12-20",
      category: "Case Studies",
    },
  ];

  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insights & Resources</h1>
          <p className="text-xl text-gray-600">
            Thought leadership and practical guides for SME growth
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-base mb-3">
                      {article.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{article.category}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/insights/${article.id}`}>
                  <Button variant="outline">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">More articles coming soon!</p>
        </div>
      </div>
    </Shell>
  );
}


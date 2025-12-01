"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Exec Connect</h1>
          <p className="text-xl text-gray-600">
            Empowering SMEs with strategic leadership expertise
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To democratize access to strategic leadership expertise, enabling every SME to grow 
                smarter and faster with world-class CXO guidance, powered by AI and human expertise.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To bridge the leadership gap for SMEs by providing on-demand CXO expertise through 
                AI-powered diagnostics and fractional human advisors, making strategic guidance 
                accessible and affordable for growing businesses.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Founder Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Founder's Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                PK
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Parvinjeet Kaur</h3>
                <p className="text-gray-700 mb-4">
                  After years of working with SMEs and witnessing the challenges they face in accessing 
                  strategic leadership, I founded Exec Connect with a simple belief: every growing business 
                  deserves access to world-class strategic guidance, regardless of size or budget.
                </p>
                <p className="text-gray-700">
                  Combining my experience in finance, operations, and technology, Exec Connect was born 
                  to bridge the gap between SMEs and the strategic expertise they need to thrive. We believe 
                  that with the right guidance, any SME can achieve remarkable growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">AI-First</h4>
                <p className="text-sm text-gray-600">
                  We leverage cutting-edge AI to provide instant insights, making strategic guidance 
                  accessible 24/7 at a fraction of traditional costs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Human When Needed</h4>
                <p className="text-sm text-gray-600">
                  For critical decisions requiring human judgment, we connect you with experienced 
                  fractional CXOs who understand your business context.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ecosystem Support</h4>
                <p className="text-sm text-gray-600">
                  Beyond diagnostics, we provide tools, resources, and community to support your 
                  entire growth journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Accessibility</h4>
                <p className="text-sm text-gray-600">
                  Strategic leadership should be accessible to all SMEs, not just well-funded startups.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quality</h4>
                <p className="text-sm text-gray-600">
                  We maintain the highest standards in both AI insights and human expertise.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Impact</h4>
                <p className="text-sm text-gray-600">
                  Our success is measured by the real business improvements we help achieve.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Integrity</h4>
                <p className="text-sm text-gray-600">
                  Honest, transparent, and ethical in all our interactions and recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}


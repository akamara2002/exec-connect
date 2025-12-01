"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Building2, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EcosystemPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The Ecosystem</h1>
          <p className="text-xl text-gray-600">
            Exec Connect is part of a comprehensive ecosystem supporting SME growth
          </p>
        </div>

        {/* Ecosystem Map */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl">Capital + Capability + Community</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>Capital</CardTitle>
                  <CardDescription>Access to Funding</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    Connect with Be Noor Capital for funding opportunities and investment access.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-600 border-2">
                <CardHeader>
                  <Building2 className="w-12 h-12 text-purple-600 mb-4" />
                  <CardTitle>Capability</CardTitle>
                  <CardDescription>Exec Connect - Strategic Leadership</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    The "Capability Node" - AI-powered diagnostics and fractional CXO expertise.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-12 h-12 text-green-600 mb-4" />
                  <CardTitle>Community</CardTitle>
                  <CardDescription>SME Resource Centre</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    SP Corporate - Tools, resources, and peer networks for SME growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Exec Connect's Role */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Exec Connect: The Capability Node</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Exec Connect serves as the strategic leadership bridge in the SME growth ecosystem. 
              We provide the capability layer that helps businesses:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Make informed decisions about funding needs (connecting to Capital)</li>
              <li>• Access tools and resources for self-led growth (connecting to Community)</li>
              <li>• Build the strategic foundation needed for successful capital deployment</li>
              <li>• Create value that attracts investment and supports sustainable growth</li>
            </ul>
          </CardContent>
        </Card>

        {/* Resource Centre */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">SME Resource Centre</CardTitle>
            <CardDescription>Before committing to human CXO, explore our resource centre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Playbooks & Templates</h4>
                <p className="text-sm text-gray-600">
                  Downloadable guides, templates, and frameworks for common business challenges.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Masterclasses</h4>
                <p className="text-sm text-gray-600">
                  Curated video content from industry experts on key business topics.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Peer Groups</h4>
                <p className="text-sm text-gray-600">
                  Join communities of like-minded entrepreneurs for support and learning.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Tools & Calculators</h4>
                <p className="text-sm text-gray-600">
                  Interactive tools for financial planning, marketing ROI, and more.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Link href="/get-started">
            <Button size="lg">
              Explore Resources <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
}


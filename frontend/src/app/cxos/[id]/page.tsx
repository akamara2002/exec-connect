"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, DollarSign, Star, Mail, Phone, Linkedin, ArrowLeft, CheckCircle } from "lucide-react";

// Mock CXO data - in production, fetch from API
const cxos: Record<string, any> = {
  "cfo-1": {
    name: "Sarah Chen",
    role: "CFO",
    title: "Fractional CFO | Financial Strategy Expert",
    experience: "15+ years in SME finance and fundraising",
    image: "/images/cxos/cfo-1.jpg",
    rate: 100,
    rating: 4.9,
    reviews: 47,
    specialties: ["Cash Flow Management", "Fundraising", "Financial Modeling", "M&A"],
    bio: "Former CFO of 3 successful exits. Specialized in helping SMEs raise capital and optimize financial operations.",
    email: "sarah.chen@execconnect.com",
    linkedin: "linkedin.com/in/sarahchencfo",
    achievements: [
      "Helped 30+ SMEs raise over RM50M in funding",
      "Led financial operations for 3 successful exits",
      "Expert in Southeast Asia SME financing",
    ],
  },
  // Add other CXOs similarly...
};

export default function CXODetailPage() {
  const params = useParams();
  const router = useRouter();
  const cxoId = params.id as string;
  const cxo = cxos[cxoId] || {
    name: "CXO Name",
    role: "CFO",
    title: "Fractional Executive",
    rate: 100,
    rating: 4.9,
    reviews: 30,
    specialties: ["Specialty 1", "Specialty 2"],
    bio: "Experienced executive with proven track record.",
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-6">
          <Link href="/cxos" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to All CXOs
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {cxo.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-3xl">{cxo.name}</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">{cxo.role}</Badge>
                </div>
                <CardDescription className="text-lg">{cxo.title}</CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{cxo.rating}</span>
                    <span className="text-sm text-gray-500">({cxo.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">RM {cxo.rate}/hour</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-gray-700">{cxo.bio || "Experienced executive with proven track record."}</p>
              <p className="text-sm text-gray-600 mt-2">{cxo.experience}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {cxo.specialties?.map((spec: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {cxo.achievements && (
              <div>
                <h3 className="font-semibold mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {cxo.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-6">
              <Link href={`/book-cxo/${cxoId}`}>
                <Button size="lg" className="w-full">
                  <Clock className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}


"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, DollarSign, Mail, Phone } from "lucide-react";
import Link from "next/link";

// Mock CXO data - in production, fetch from API
const cxos: Record<string, any> = {
  "cfo-1": { name: "Sarah Chen", role: "CFO", rate: 100 },
  "cfo-2": { name: "David Lim", role: "CFO", rate: 100 },
  "cfo-3": { name: "Priya Sharma", role: "CFO", rate: 100 },
  "cmo-1": { name: "James Tan", role: "CMO", rate: 100 },
  "cmo-2": { name: "Lisa Wong", role: "CMO", rate: 100 },
  "cmo-3": { name: "Ahmad Rahman", role: "CMO", rate: 100 },
  "coo-1": { name: "Michelle Lee", role: "COO", rate: 100 },
  "coo-2": { name: "Rajesh Kumar", role: "COO", rate: 100 },
  "coo-3": { name: "Jennifer Ng", role: "COO", rate: 100 },
  "cto-1": { name: "Kevin Tan", role: "CTO", rate: 100 },
  "cto-2": { name: "Nurul Huda", role: "CTO", rate: 100 },
  "cto-3": { name: "Michael Chua", role: "CTO", rate: 100 },
};

export default function BookCXOPage() {
  const params = useParams();
  const router = useRouter();
  const cxoId = params.id as string;
  const cxo = cxos[cxoId];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    hours: "1",
    engagementType: "one-time",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  if (!cxo) {
    return (
      <Shell>
        <Card className="max-w-md mx-auto mt-12">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">CXO not found</p>
            <Link href="/cxos">
              <Button>Browse All CXOs</Button>
            </Link>
          </CardContent>
        </Card>
      </Shell>
    );
  }

  const totalCost = parseInt(formData.hours) * cxo.rate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Booking request sent to ${cxo.name}! We'll contact you within 24 hours to confirm.`);
      router.push("/get-started");
      setLoading(false);
    }, 1000);
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/cxos" className="text-blue-600 hover:underline text-sm">
            ← Back to CXOs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book Consultation with {cxo.name}</CardTitle>
                <CardDescription>
                  Fill out the form below to schedule your consultation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hours">Consultation Hours *</Label>
                      <Select
                        value={formData.hours}
                        onValueChange={(value) => setFormData({ ...formData, hours: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="3">3 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">Full day (8 hours)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="engagementType">Engagement Type *</Label>
                      <Select
                        value={formData.engagementType}
                        onValueChange={(value) => setFormData({ ...formData, engagementType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time Consultation</SelectItem>
                          <SelectItem value="monthly">Monthly Retainer</SelectItem>
                          <SelectItem value="project">Project-based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Details</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your specific challenges or what you'd like to discuss..."
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">CXO</p>
                  <p className="font-semibold">{cxo.name}</p>
                  <p className="text-sm text-gray-600">{cxo.role}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Hours</span>
                    <span className="font-medium">{formData.hours} hour{formData.hours !== "1" ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Rate</span>
                    <span className="font-medium">RM {cxo.rate}/hr</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">RM {totalCost}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-600 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    We'll confirm availability within 24 hours
                  </p>
                  <p className="text-xs text-gray-600">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Payment required after confirmation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}


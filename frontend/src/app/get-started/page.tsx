"use client";

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    employees: "",
    stage: "",
    challenge: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you! We'll contact you within 24 hours to get started.");
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Started</h1>
          <p className="text-xl text-gray-600">
            Take the first step toward strategic leadership
          </p>
        </div>

        {/* Quick Quiz */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Are You CXO-Ready? Quick Assessment</CardTitle>
            <CardDescription>
              Answer a few questions to see if Exec Connect is right for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Company Name *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  placeholder="Your company name"
                />
              </div>

              <div>
                <Label>Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="f&b">Food & Beverage</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Number of Employees *</Label>
                <Select
                  value={formData.employees}
                  onValueChange={(value) => setFormData({ ...formData, employees: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 employees</SelectItem>
                    <SelectItem value="6-10">6-10 employees</SelectItem>
                    <SelectItem value="11-25">11-25 employees</SelectItem>
                    <SelectItem value="26-50">26-50 employees</SelectItem>
                    <SelectItem value="50+">50+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Business Stage *</Label>
                <RadioGroup
                  value={formData.stage}
                  onValueChange={(value) => setFormData({ ...formData, stage: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="survival" id="survival" />
                    <Label htmlFor="survival">Survival (0-1 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stability" id="stability" />
                    <Label htmlFor="stability">Stability (1-3 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="success" id="success" />
                    <Label htmlFor="success">Success (3-5 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scale" id="scale" />
                    <Label htmlFor="scale">Scale (5+ years)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Biggest Challenge *</Label>
                <Select
                  value={formData.challenge}
                  onValueChange={(value) => setFormData({ ...formData, challenge: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Financial Management & Cash Flow</SelectItem>
                    <SelectItem value="marketing">Marketing & Customer Acquisition</SelectItem>
                    <SelectItem value="operations">Operations & Efficiency</SelectItem>
                    <SelectItem value="technology">Technology & Digitalization</SelectItem>
                    <SelectItem value="fundraising">Fundraising & Investment</SelectItem>
                    <SelectItem value="scaling">Scaling & Growth</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Your Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit & Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Alternative Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Try AI Agents First</CardTitle>
              <CardDescription>Get instant insights for free</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Start with our AI-powered CXO agents to get immediate strategic insights. 
                No commitment required.
              </p>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Explore AI Agents
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Book a Discovery Call</CardTitle>
              <CardDescription>Talk to our team directly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a free 30-minute call to discuss your needs and see how Exec Connect can help.
              </p>
              <Link href="/book-call">
                <Button variant="outline" className="w-full">
                  Book a Call
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}


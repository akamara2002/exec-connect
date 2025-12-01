"use client";

import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, DollarSign, TrendingUp, CheckCircle, Users, Target } from "lucide-react";

export default function Home() {
  return (
    <Shell>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Strategic Leadership</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
            Access Strategic Leadership{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Without Full-Time Cost
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Exec Connect delivers on-demand CXO expertise to help SMEs grow smarter, faster.
            Transform your business with AI-powered insights and human expertise.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/get-started">
              <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-300">
                Get Started
              </Button>
            </Link>
            <Link href="/book-diagnostic">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2 hover:bg-gray-50 transition-all duration-300">
                Book a Diagnostic
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top 3 Benefits */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Speed</CardTitle>
              <CardDescription className="text-base">
                Get strategic insights in hours, not months. Our AI-powered diagnostics provide instant analysis.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Savings</CardTitle>
              <CardDescription className="text-base">
                Access CXO-level expertise at 60-80% less cost than hiring full-time executives.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Strategic Impact</CardTitle>
              <CardDescription className="text-base">
                Make data-driven decisions with actionable recommendations tailored to your business.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works - Quick Overview */}
      <section className="max-w-7xl mx-auto py-20 px-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl border border-blue-100/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get strategic guidance in 4 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: 1, title: "Share Your Profile", desc: "Tell us about your business, challenges, and goals" },
            { num: 2, title: "AI Diagnostic", desc: "Choose general or specialized CXO assessment" },
            { num: 3, title: "Human CXO Match", desc: "Optional connection with expert advisors" },
            { num: 4, title: "Execute & Impact", desc: "Implement with AI-tracked KPIs and support" },
          ].map((step) => (
            <div key={step.num} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                {step.num}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/how-it-works">
            <Button variant="outline" className="border-2 hover:bg-white transition-all duration-300">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CXO Agents */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered CXO Agents</h2>
          <p className="text-lg text-gray-600">Get instant expertise across all key business functions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { href: "/cfo", icon: Users, title: "AI-CFO", color: "blue", desc: "Financial diagnostics, cash flow management, and funding readiness" },
            { href: "/cmo", icon: Target, title: "AI-CMO", color: "purple", desc: "Marketing strategy, customer acquisition, and brand optimization" },
            { href: "/coo", icon: CheckCircle, title: "AI-COO", color: "green", desc: "Operations optimization, process improvement, and efficiency" },
            { href: "/cto", icon: Zap, title: "AI-CTO", color: "orange", desc: "Technology strategy, digital transformation, and infrastructure" },
          ].map((agent) => {
            const Icon = agent.icon;
            const gradientClasses = {
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              green: "from-green-500 to-green-600",
              orange: "from-orange-500 to-orange-600",
            };
            return (
              <Link key={agent.href} href={agent.href}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClasses[agent.color as keyof typeof gradientClasses]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {agent.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {agent.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:text-blue-600 transition-colors">
                      Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="max-w-7xl mx-auto py-20 px-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
          <p className="text-lg text-gray-600">Real transformations from real businesses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Retail Turnaround", metric: "RM72K saved", desc: "Small retail chain improved margins and reduced costs with AI-COO guidance." },
            { title: "Manufacturing Success", metric: "Cash flow improved by 30%", desc: "Manufacturer optimized working capital with AI-CFO recommendations." },
            { title: "SaaS Growth", metric: "CAC down 20%, Leads up 35%", desc: "Tech startup optimized marketing funnel with AI-CMO insights." },
          ].map((study) => (
            <Card key={study.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{study.title}</CardTitle>
                <CardDescription className="font-semibold text-blue-600">{study.metric}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">{study.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/case-studies">
            <Button variant="outline" className="border-2 hover:bg-white transition-all duration-300">
              View All Case Studies <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Form: Is Exec Connect Right For You? */}
      <section className="max-w-4xl mx-auto py-20 px-4">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-3">Is Exec Connect Right For You?</CardTitle>
            <CardDescription className="text-base">
              Answer a few quick questions to see if our platform can help your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                "Your business is between 1-50 employees",
                "You need strategic guidance but can't afford full-time CXOs",
                "You want data-driven insights and actionable recommendations",
                "You're ready to scale but need expert guidance",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base text-gray-700">{item}</p>
                </div>
              ))}
              <div className="pt-6">
                <Link href="/get-started">
                  <Button className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-300">
                    Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}

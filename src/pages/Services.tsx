'use client';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  CreditCard, 
  Shield, 
  Stethoscope,
  Eye,
  Bone,
  Smile
} from "lucide-react";
import Link from "next/link";

const Services = () => {
  const coreServices = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent appointment booking system that reduces no-shows and optimizes your calendar."
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records and communication tools for better care coordination."
    },
    {
      icon: MessageSquare,
      title: "Communication Hub", 
      description: "Automated reminders, confirmations, and follow-ups via SMS, email, and voice."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Real-time insights into practice performance and patient satisfaction metrics."
    },
    {
      icon: CreditCard,
      title: "Revenue Management",
      description: "Streamlined billing, payment processing, and insurance claim management."
    },
    {
      icon: Shield,
      title: "HIPAA Compliance",
      description: "Bank-level security ensuring your practice meets all regulatory requirements."
    }
  ];

  const industries = [
    {
      icon: Smile,
      name: "Dental Practices",
      description: "Comprehensive solutions for general dentistry, oral surgery, and specialized dental care.",
      features: ["Treatment planning", "Insurance verification", "Patient education tools"]
    },
    {
      icon: Eye,
      name: "Optometry",
      description: "Tailored tools for eye care professionals and vision therapy practices.",
      features: ["Vision testing workflows", "Frame inventory", "Insurance processing"]
    },
    {
      icon: Bone,
      name: "Chiropractic",
      description: "Specialized features for chiropractic care and physical rehabilitation.",
      features: ["Treatment plans", "Progress tracking", "Therapy scheduling"]
    },
    {
      icon: Stethoscope,
      name: "Orthodontics",
      description: "Complete practice management for orthodontic treatments and patient monitoring.",
      features: ["Treatment tracking", "Progress photos", "Payment plans"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
              Comprehensive <span className="text-primary">Healthcare Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to run a modern, efficient healthcare practice. From patient management to revenue optimization.
            </p>
            <Link href="/schedule-a-demo"  className="btn-primary">
                    Schedule a Demo
                  </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Core Platform Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools designed to streamline your practice operations and improve patient outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service) => (
              <Card key={service.title} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-navy">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored features and workflows designed for different healthcare specialties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <Card key={industry.name} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-orange" />
                    </div>
                    <CardTitle className="text-xl text-navy">{industry.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {industry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {industry.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of healthcare professionals who trust Adit to streamline their operations and improve patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="orange"
                size="lg" 
                className="px-8 py-3 rounded-full"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
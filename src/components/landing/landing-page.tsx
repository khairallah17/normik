"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingHeader } from './landing-header';
import { VCANavigation } from '@/components/vca-navigation';
import {
  Shield,
  Users,
  BarChart3,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Award,
  FolderOpen,
} from 'lucide-react';

export function LandingPage() {
  const t = useTranslations('landing');
  const tStructure = useTranslations('handbook.structure');

  const features = [
    {
      icon: Award,
      title: t('features.certification_management.title'),
      description: t('features.certification_management.description'),
    },
    {
      icon: FolderOpen,
      title: t('features.document_management.title'),
      description: t('features.document_management.description'),
    },
    {
      icon: Zap,
      title: t('features.workflow_automation.title'),
      description: t('features.workflow_automation.description'),
    },
    {
      icon: Users,
      title: t('features.user_management.title'),
      description: t('features.user_management.description'),
    },
    {
      icon: BarChart3,
      title: t('features.reporting.title'),
      description: t('features.reporting.description'),
    },
    {
      icon: Shield,
      title: t('features.compliance.title'),
      description: t('features.compliance.description'),
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('benefits.efficiency.title'),
      description: t('benefits.efficiency.description'),
    },
    {
      icon: CheckCircle2,
      title: t('benefits.compliance.title'),
      description: t('benefits.compliance.description'),
    },
    {
      icon: Users,
      title: t('benefits.collaboration.title'),
      description: t('benefits.collaboration.description'),
    },
    {
      icon: TrendingUp,
      title: t('benefits.scalability.title'),
      description: t('benefits.scalability.description'),
    },
  ];

  const stats = [
    { value: '500+', label: t('stats.organizations') },
    { value: '50K+', label: t('stats.documents') },
    { value: '1,200+', label: t('stats.certifications') },
    { value: '10K+', label: t('stats.users') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      {/* Main Dashboard Section - Matching VCA Dashboard Structure */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welkom</h1>
        </div>

        {/* Navigation Container - Matching KAM-systeem.nl */}
        <div className="mb-6">
          <VCANavigation />
        </div>

        {/* Grid of Icon Cards - Matching KAM-systeem.nl */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'general', key: 'general', url: '/dashboard/vca/general', number: null, image: '/images/landing/db_company.png' },
            { id: 'policy', key: 'policy', url: '/dashboard/vca/policy', number: 1, image: '/images/landing/db_responsability.png' },
            { id: 'risks', key: 'risks', url: '/dashboard/vca/risks', number: 2, image: '/images/landing/risk.jpg' },
            { id: 'competence', key: 'competence', url: '/dashboard/vca/competence', number: 3, image: '/images/landing/employees.jpg' },
            { id: 'ohs_awareness', key: 'ohs_awareness', url: '/dashboard/vca/ohs-awareness', number: 4, image: '/images/landing/exchange-of-ideas.jpg' },
            { id: 'ohs_project_plan', key: 'ohs_project_plan', url: '/dashboard/vca/ohs-project-plan', number: 5, image: '/images/landing/icoon-planning.jpg' },
            { id: 'emergency_situations', key: 'emergency_situations', url: '/dashboard/vca/emergency-situations', number: 6, image: '/images/landing/ambulance.jpg' },
            { id: 'inspections', key: 'inspections', url: '/dashboard/vca/inspections', number: 7, image: '/images/landing/workin.jpg' },
            { id: 'health', key: 'health', url: '/dashboard/vca/health', number: 8, image: '/images/landing/bedrijfsarts.jpg' },
            { id: 'resources', key: 'resources', url: '/dashboard/vca/resources', number: 9, image: '/images/landing/verzamelplaats.jpg' },
            { id: 'procurement_services', key: 'procurement_services', url: '/dashboard/vca/procurement-services', number: 10, image: '/images/landing/consulting3.png' },
            { id: 'ohs_incidents', key: 'ohs_incidents', url: '/dashboard/vca/ohs-incidents', number: 11, image: '/images/landing/db_responsability.png' },
          ].map((section) => {
            const sectionTitle = section.number 
              ? `${section.number}. ${tStructure(section.key).toUpperCase()}`
              : tStructure(section.key).toUpperCase();
            
            return (
              <Link
                key={section.id}
                href={section.url}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-[#0066CC] bg-gradient-to-br from-white to-[#E6F2FF] overflow-hidden">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center min-h-[140px]">
                    <div className="mb-3 relative w-16 h-16">
                      <Image
                        src={section.image}
                        alt={sectionTitle}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-xs text-[#003366] group-hover:text-[#0066CC] transition-colors leading-tight">
                      {sectionTitle}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t('features.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const featureImages = [
                '/images/landing/employees.jpg',
                '/images/landing/verzamelplaats.jpg',
                '/images/landing/exchange-of-ideas.jpg',
                '/images/landing/workin.jpg',
                '/images/landing/risk.jpg',
                '/images/landing/bedrijfsarts.jpg',
              ];
              const hasImage = index < featureImages.length;
              
              return (
                <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors overflow-hidden">
                  {hasImage ? (
                    <>
                      <div className="relative h-48 w-full">
                        <Image
                          src={featureImages[index]}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t('benefits.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('benefits.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center border-primary/10">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t('stats.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-primary/10 bg-primary/5">
                <CardHeader>
                  <div className="text-4xl font-bold text-primary md:text-5xl">
                    {stat.value}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {stat.label}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              {t('cta.description')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  {t('cta.button')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  {t('cta.contact')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingHeader } from './landing-header';
import {
  FileText,
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
              {t('hero.subtitle')}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  {t('hero.cta_primary')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  {t('hero.cta_secondary')}
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Illustration */}
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <FileText className="h-12 w-12 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Document Management</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <Award className="h-12 w-12 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">ISO Certifications</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Compliance Tracking</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
              return (
                <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
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


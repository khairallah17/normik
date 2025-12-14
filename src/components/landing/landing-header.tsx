"use client";

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslations } from 'next-intl';

export function LandingHeader() {
  const t = useTranslations('landing');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold uppercase text-primary">
            NORMIK
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </Link>
          <Link href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Stats
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">
              {t('hero.cta_primary')}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}


'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { VCAHeader } from "@/components/vca-header"
import { useTranslations } from 'next-intl'
import { usePathname } from "@/i18n/routing"

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  // Check if we're on the main dashboard page (hide sidebar)
  const isMainDashboard = pathname === '/dashboard' || pathname?.endsWith('/dashboard');
  
  // Check if we're on a VCA page (hide sidebar - navigation is in header)
  // Account for locale prefix (e.g., /nl/dashboard/vca or /en/dashboard/vca)
  // Also check for VCA modules pages
  const isVCAPage = pathname?.includes('/dashboard/vca') || 
                    pathname?.includes('/vca') || 
                    pathname?.includes('vca/modules');

  if (isMainDashboard) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold uppercase">NORMIK</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    );
  }

  if (isVCAPage) {
    return (
      <div className="min-h-screen bg-background">
        <VCAHeader />
        <main className="container max-w-7xl mx-auto px-6 py-8" style={{ paddingTop: '72px' }}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      {t('building_your_application')}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{t('data_fetching')}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
        <div className="mx-auto w-full p-4 pt-0">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

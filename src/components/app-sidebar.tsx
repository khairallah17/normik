"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  Folder,
  GalleryVerticalEnd,
  Settings,
} from "lucide-react"
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { HandbookSidebar } from "@/components/handbook/handbook-sidebar"
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure } from "@/lib/certification-structures"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('sidebar');
  const tHandbook = useTranslations('handbook');
  const pathname = usePathname();
  
  // Check if we're on a certification page
  const certificationMatch = pathname?.match(/^\/dashboard\/(iso-9001|iso-45001|hkz-kleine-organisaties-2021|hkz-vvt|vca)/);
  const isCertificationPage = !!certificationMatch;
  const certification = certificationMatch ? certificationMatch[1] : null;
  
  // Check if we're on a handbook page (for backward compatibility)
  const isHandbookPage = pathname?.startsWith('/dashboard/handbook') && !isCertificationPage;
  
  // This is sample data with translations
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: t('handbook'),
        url: "#",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: 'ISO 9001',
            url: "/dashboard/iso-9001",
          },
          {
            title: 'ISO 45001',
            url: "/dashboard/iso-45001",
          },
          {
            title: 'HKZ Kleine Organisaties 2021',
            url: "/dashboard/hkz-kleine-organisaties-2021",
          },
          {
            title: 'HKZ VVT',
            url: "/dashboard/hkz-vvt",
          },
          {
            title: 'VCA',
            url: "/dashboard/vca",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        isActive: false,
        items: [
          {
            title: "User Management",
            url: "/settings/users",
          },
          {
            title: "System",
            url: "/settings/system",
          },
        ],
      },
    ],
    projects: [
      {
        name: `${t('project')} 1`,
        url: "#",
        icon: Folder,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <p className="font-bold text-2xl text-primary">
          NORMIK
        </p>
      </SidebarHeader>
      <SidebarContent>
        {isCertificationPage && certification ? (
          /* Show Certification Navigation when on certification pages */
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {tHandbook('title')}
            </SidebarGroupLabel>
            <CertificationSidebar 
              certificationId={certification} 
              structure={getCertificationStructure(certification)} 
            />
          </SidebarGroup>
        ) : isHandbookPage ? (
          /* Show Handbook Navigation when on handbook pages */
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {tHandbook('title')}
            </SidebarGroupLabel>
            <HandbookSidebar />
          </SidebarGroup>
        ) : (
          /* Show default navigation */
          <>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

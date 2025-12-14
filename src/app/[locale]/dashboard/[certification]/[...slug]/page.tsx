'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentViewer } from "@/components/handbook/document-viewer"
import { getDocumentsForSection } from "@/lib/documents"
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { ChevronRight, Folder } from "lucide-react"
import { CertificationSidebar } from "@/components/handbook/certification-sidebar"
import { getCertificationStructure, TreeNode } from "@/lib/certification-structures"
import { WorkPlansPage } from "@/components/handbook/work-plans-page"
import { WorkplaceInspectionsPage } from "@/components/handbook/workplace-inspections-page"
import { NotificationsPage } from "@/components/handbook/notifications-page"
import { PersonnelPage } from "@/components/handbook/personnel-page"
import { WorkEquipmentPage } from "@/components/handbook/work-equipment-page"

interface Subsection {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
}

interface PageProps {
  params: Promise<{
    certification: string
    slug: string[]
  }>
}

export default function CertificationSectionPage({ params }: PageProps) {
  const tStructure = useTranslations('handbook.structure');
  const pathname = usePathname();
  
  // For Next.js 15, use React.use() pattern
  const resolvedParams = React.use(params);
  const { certification, slug } = resolvedParams;
  
  // Get certification structure
  const structure = getCertificationStructure(certification);
  
  // Get certification name
  const getCertificationName = () => {
    switch (certification) {
      case 'iso-9001':
        return tStructure('iso_9001');
      case 'iso-45001':
        return tStructure('iso_45001');
      case 'hkz-kleine-organisaties-2021':
        return tStructure('hkz_small_organizations_2021');
      case 'hkz-vvt':
        return tStructure('hkz_vvt');
      case 'vca':
        return tStructure('vca');
      default:
        return certification;
    }
  };
  
  const certificationName = getCertificationName();
  
  // Convert slug to readable title
  const getSectionTitle = () => {
    if (slug.length === 0) {
      return certificationName;
    }
    
    // Try to find the title from the structure
    const findTitleInStructure = (nodes: TreeNode[], path: string[]): string | null => {
      if (path.length === 0) return null;
      
      const currentSlug = path[0];
      const node = nodes.find(n => {
        const nodeSlug = n.url.split('/').pop();
        return nodeSlug === currentSlug;
      });
      
      if (!node) return null;
      
      if (path.length === 1) {
        return tStructure(node.titleKey);
      }
      
      if (node.children) {
        return findTitleInStructure(node.children, path.slice(1));
      }
      
      return null;
    };
    
    const title = findTitleInStructure(structure, slug);
    if (title) return title;
    
    // Fallback: build title from slug
    return slug
      .join(' / ')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const sectionTitle = getSectionTitle();

  // Get documents for this section
  const documents = getDocumentsForSection(pathname);

  // Define subsections for parent sections
  const getSubsections = (): Subsection[] => {
    // Get subsections from the structure
    const findSubsections = (nodes: TreeNode[], path: string[]): Subsection[] => {
      if (path.length === 0) {
        return nodes.map((node, index) => ({
          id: `${index + 1}`,
          titleKey: node.titleKey,
          descriptionKey: node.descriptionKey,
          url: node.url.replace('/dashboard/handbook', `/dashboard/${certification}`),
        }));
      }
      
      const currentSlug = path[0];
      const node = nodes.find(n => {
        const nodeSlug = n.url.split('/').pop();
        return nodeSlug === currentSlug;
      });
      
      if (!node || !node.children) return [];
      
      return node.children.map((child: TreeNode, index: number) => ({
        id: `${index + 1}`,
        titleKey: child.titleKey,
        descriptionKey: child.descriptionKey,
        url: child.url.replace('/dashboard/handbook', `/dashboard/${certification}`),
      }));
    };
    
    return findSubsections(structure, slug);
  };

  const subsections = getSubsections();

  // Get requirements (reuse from handbook page logic)
  const getRequirements = (): string[] => {
    // This will be populated from the existing requirements map
    // For now, return empty array - we'll need to update this
    return [];
  };

  const requirements = getRequirements();

  // Check if this is a module page
  const isModulePage = certification === 'vca' && slug.length >= 2 && slug[0] === 'modules';
  
  if (isModulePage) {
    const moduleSlug = slug[1]; // e.g., 'work-plans', 'workplace-inspections', etc.
    
    // Map module slugs to dedicated components
    const moduleComponents: Record<string, React.ComponentType> = {
      'work-plans': WorkPlansPage,
      'workplace-inspections': WorkplaceInspectionsPage,
      'notifications': NotificationsPage,
      'personnel': PersonnelPage,
      'work-equipment': WorkEquipmentPage,
    };

    const ModuleComponent = moduleComponents[moduleSlug];
    
    if (ModuleComponent) {
      return <ModuleComponent />;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/dashboard/${certification}`} className="hover:text-foreground">
          {certificationName}
        </Link>
        {slug.map((segment, index) => {
          const segmentPath = `/dashboard/${certification}/${slug.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="h-4 w-4" />
              <Link href={segmentPath} className="hover:text-foreground">
                {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{sectionTitle}</h1>
      </div>

      {/* Subsections */}
      {subsections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Subsections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subsections.map((subsection) => (
                <Link
                  key={subsection.id}
                  href={subsection.url}
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <Folder className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">{tStructure(subsection.titleKey)}</div>
                    {subsection.descriptionKey && (
                      <div className="text-sm text-muted-foreground">
                        {tStructure(subsection.descriptionKey)}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      {documents && documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentViewer documents={documents} sectionTitle={sectionTitle} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Export sidebar component for layout
export function CertificationSectionPageSidebar({ certification }: { certification: string }) {
  const structure = getCertificationStructure(certification);
  return <CertificationSidebar certificationId={certification} structure={structure} />;
}



'use client'

import { useState, useEffect } from "react"
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  FileText,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import { Link, usePathname } from "@/i18n/routing"

/**
 * Certification Sidebar Component
 * 
 * Displays only the tree structure for a specific certification
 */

interface TreeNode {
  id: string
  titleKey: string
  descriptionKey?: string
  url: string
  children?: TreeNode[]
}

interface TreeItemProps {
  item: TreeNode
  level?: number
  basePath: string
}

function TreeItem({ item, level = 0, basePath }: TreeItemProps) {
  const t = useTranslations('handbook.structure');
  const pathname = usePathname();
  
  // Check if this is VCA certification
  const isVCA = basePath.includes('/vca');
  
  // Get section number for VCA (matching KAM-systeem.nl numbering)
  const getVCASectionNumber = (titleKey: string): number | null => {
    if (!isVCA) return null;
    const vcaNumberMap: Record<string, number> = {
      'general': 0,
      'policy': 1,
      'risks': 2,
      'competence': 3,
      'ohs_awareness': 4,
      'ohs_project_plan': 5,
      'emergency_situations': 6,
      'inspections': 7,
      'health': 8,
      'resources': 9,
      'procurement_services': 10,
      'ohs_incidents': 11,
    };
    return vcaNumberMap[titleKey] ?? null;
  };
  
  // Update URL to use new base path
  const itemUrl = item.url.replace('/dashboard/handbook', basePath);
  
  // Auto-expand if this item or any child is active
  const isActive = pathname === itemUrl;
  const hasActiveChild = item.children?.some(child => {
    const childUrl = child.url.replace('/dashboard/handbook', basePath);
    return pathname?.startsWith(childUrl) || child.children?.some(grandchild => {
      const grandchildUrl = grandchild.url.replace('/dashboard/handbook', basePath);
      return pathname?.startsWith(grandchildUrl);
    });
  });
  const shouldExpand = level === 0 || level === 1 || isActive || hasActiveChild;
  const [isExpanded, setIsExpanded] = useState(shouldExpand);
  
  const hasChildren = item.children && item.children.length > 0
  
  // Update expanded state when pathname changes
  useEffect(() => {
    if (isActive || hasActiveChild) {
      setIsExpanded(true);
    }
  }, [pathname, isActive, hasActiveChild]);
  
  const title = t(item.titleKey);
  const description = item.descriptionKey ? t(item.descriptionKey) : undefined;
  const sectionNumber = getVCASectionNumber(item.titleKey);
  
  const content = (
    <>
      {hasChildren ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center justify-center w-4 h-4"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </button>
      ) : (
        <div className="w-4" />
      )}
      {hasChildren ? (
        isExpanded ? (
          <FolderOpen className={cn("h-4 w-4", isVCA ? (isActive ? "text-white" : "text-[#0066CC]") : "text-blue-500")} />
        ) : (
          <Folder className={cn("h-4 w-4", isVCA ? (isActive ? "text-white" : "text-[#0066CC]") : "text-blue-500")} />
        )
      ) : (
        <FileText className={cn("h-4 w-4", isVCA ? (isActive ? "text-white" : "text-gray-500") : "text-gray-500")} />
      )}
      <span className="flex-1 text-sm">
        {isVCA && sectionNumber !== null && sectionNumber > 0 && (
          <span className="font-semibold text-[#0066CC] mr-1">{sectionNumber}.</span>
        )}
        {title}
      </span>
    </>
  );

  return (
    <div className="select-none">
      <Link
        href={itemUrl}
        className={cn(
          "flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-colors",
          isVCA 
            ? (isActive 
                ? "bg-[#0066CC] text-white hover:bg-[#004499]" 
                : "hover:bg-[#E6F2FF] text-[#003366]")
            : (isActive 
                ? "bg-accent" 
                : "hover:bg-accent")
        )}
        style={{ marginLeft: `${level * 16}px` }}
      >
        {content}
      </Link>

      {hasChildren && isExpanded && item.children && (
        <div className="space-y-1">
          {item.children.map((child: TreeNode) => (
            <TreeItem key={child.id} item={child} level={level + 1} basePath={basePath} />
          ))}
        </div>
      )}
    </div>
  )
}

interface CertificationSidebarProps {
  certificationId: string
  structure: TreeNode[]
}

export function CertificationSidebar({ certificationId, structure }: CertificationSidebarProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/${certificationId}`;
  
  // Update all URLs in structure to use new base path
  const updateStructureUrls = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map(node => ({
      ...node,
      url: node.url.replace('/dashboard/handbook', basePath),
      children: node.children ? updateStructureUrls(node.children) : undefined
    }));
  };
  
  const updatedStructure = updateStructureUrls(structure);

  return (
    <div className="space-y-2">
      {updatedStructure.map((item) => (
        <TreeItem key={item.id} item={item} basePath={basePath} />
      ))}
    </div>
  )
}



'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Folder, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'

/**
 * Handbook Content Component
 * 
 * Displays the main content area with subfolders, documents, and favorites
 */

export function HandbookContent() {
  const t = useTranslations('handbook');

  // Data for subfolders with translation keys
  const subfolders = [
    {
      id: "1",
      nameKey: "folders.year_planner",
      descriptionKey: "",
    },
    {
      id: "2",
      nameKey: "folders.activities_calendar",
      descriptionKey: "",
    },
    {
      id: "3",
      nameKey: "folders.hkz_small_organizations",
      descriptionKey: "folders.hkz_description",
    },
    {
      id: "4",
      nameKey: "folders.vilans_protocols",
      descriptionKey: "folders.vilans_description",
    },
    {
      id: "5",
      nameKey: "folders.personnel_matters",
      descriptionKey: "folders.personnel_description",
    },
    {
      id: "6",
      nameKey: "folders.faq",
      descriptionKey: "folders.faq_description",
    },
    {
      id: "7",
      nameKey: "folders.background_folders",
      descriptionKey: "folders.background_description",
    },
    {
      id: "8",
      nameKey: "folders.care_technology",
      descriptionKey: "",
    },
    {
      id: "9",
      nameKey: "folders.backup",
      descriptionKey: "",
    },
    {
      id: "10",
      nameKey: "folders.archive",
      descriptionKey: "",
    },
  ];

  // Data for documents with translation keys
  const documents = [
    {
      id: "1",
      nameKey: "documents.mydms_manual",
      descriptionKey: "documents.mydms_manual_description",
      type: "pdf",
    },
  ];

  // Data for recent documents with translation keys
  const recentDocuments = [
    {
      id: "1",
      nameKey: "recent_docs.stakeholder_analysis",
    },
    {
      id: "2",
      nameKey: "recent_docs.organization_assessment",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Subfolders Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            {t('subfolders')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {subfolders.map((folder) => (
              <div
                key={folder.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer border"
              >
                <Folder className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{t(folder.nameKey)}</h3>
                  {folder.descriptionKey && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(folder.descriptionKey)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('documents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer border"
              >
                <FileText className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{t(doc.nameKey)}</h3>
                  {doc.descriptionKey && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(doc.descriptionKey)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorites Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            {t('favorites')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">{t('recent_documents')}</TabsTrigger>
              <TabsTrigger value="favorites">{t('my_favorites')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="space-y-2 mt-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer border"
                >
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{t(doc.nameKey)}</span>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <div className="p-4 text-center text-sm text-muted-foreground border rounded-lg">
                {t('add_to_favorites')}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


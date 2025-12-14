'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Users, FileText, Shield } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from "@/i18n/routing"
import { getAllDocuments } from "@/lib/documents"

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tHandbook = useTranslations('handbook.structure');
  
  // Get recent documents (last 5)
  const allDocuments = getAllDocuments();
  const recentDocuments = allDocuments.slice(0, 5);

  // Quick access tiles - ISO Certifications and HKZ
  const quickAccessTiles = [
    { id: 1, name: tHandbook('iso_9001'), description: tHandbook('iso_9001_description'), icon: Shield, url: '/dashboard/iso-9001', color: 'text-primary', bgColor: 'bg-primary/10', badge: 'ISO 9001' },
    { id: 2, name: tHandbook('iso_45001'), description: tHandbook('iso_45001_description'), icon: Shield, url: '/dashboard/iso-45001', color: 'text-primary', bgColor: 'bg-primary/10', badge: 'ISO 45001' },
    { id: 3, name: tHandbook('hkz_small_organizations_2021'), description: tHandbook('hkz_small_organizations_2021_description'), icon: Shield, url: '/dashboard/hkz-kleine-organisaties-2021', color: 'text-primary', bgColor: 'bg-primary/10', badge: 'HKZ 2021' },
    { id: 4, name: tHandbook('hkz_vvt'), description: tHandbook('hkz_vvt_description'), icon: Shield, url: '/dashboard/hkz-vvt', color: 'text-primary', bgColor: 'bg-primary/10', badge: 'HKZ VVT' },
    { id: 5, name: tHandbook('vca'), description: tHandbook('vca_description'), icon: Shield, url: '/dashboard/vca', color: 'text-primary', bgColor: 'bg-primary/10', badge: 'VCA' },
    { id: 6, name: t('handbook'), description: t('handbook_description'), icon: Book, url: '/dashboard/handbook', color: 'text-primary', bgColor: 'bg-primary/10' },
    { id: 7, name: t('users'), description: t('users_description'), icon: Users, url: '/settings/users', color: 'text-primary', bgColor: 'bg-primary/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Access Tiles */}
      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold">{t('quick_access')}</h2>
          <p className="text-muted-foreground mt-2">{t('quick_access_description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {quickAccessTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link key={tile.id} href={tile.url}>
                <Card className="cursor-pointer transition-all hover:shadow-xl hover:border-primary h-full relative overflow-hidden group">
                  {tile.badge && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                      {tile.badge}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`${tile.bgColor} p-4 rounded-lg group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-8 w-8 ${tile.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                          {tile.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {tile.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Welcome Section */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">{t('welcome_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Book className="h-32 w-32 text-white opacity-60" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-4 flex flex-col justify-center">
                <p className="text-sm leading-relaxed">
                  {t('welcome_message')}
                </p>
                <p className="text-sm leading-relaxed">
                  {t('welcome_description')}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('search_instruction')}
                </p>
                <div className="pt-2 border-t">
                  <p className="text-sm">
                    {t('contact_text')}{' '}
                    <a href="mailto:info@topzorg.net" className="text-primary hover:underline font-semibold">
                      Elias
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Changes */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>{t('recent_changes')}</CardTitle>
            <CardDescription>{t('recent_changes_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {recentDocuments.map((doc) => (
                      <Link key={doc.id} href={`/dashboard/handbook/view/${doc.id}`}>
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer border">
                          <div className="flex-shrink-0 mt-0.5">
                            {doc.type === 'pdf' && (
                              <FileText className="h-5 w-5 text-red-500" />
                            )}
                            {(doc.type === 'docx' || doc.type === 'doc') && (
                              <FileText className="h-5 w-5 text-blue-500" />
                            )}
                            {doc.type === 'xlsx' && (
                              <FileText className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate leading-tight">{doc.name}</h4>
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                              {doc.lastModified && <span>{doc.lastModified}</span>}
                              <span className="uppercase font-mono text-[10px]">{doc.type}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/handbook">
                      {t('view_all_documents')}
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{t('no_recent_documents')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

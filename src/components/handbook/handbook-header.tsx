'use client'

import { Card } from "@/components/ui/card"
import { Link } from "@/i18n/routing"
import { useTranslations } from 'next-intl'

/**
 * Handbook Header Component
 * 
 * Displays the welcome message and introduction for the quality handbook
 */
export function HandbookHeader() {
  const t = useTranslations('handbook');

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          {t('welcome_title')}
        </h1>
        
        <div className="space-y-2 text-muted-foreground">
          <p>
            {t('welcome_description')}
          </p>
          <p>
            {t('search_instruction')}
          </p>
          <p>
            <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              {t('manual_link')}
            </Link>
          </p>
        </div>

        <p className="text-sm">
          {t('contact_text')}{" "}
          <a 
            href="mailto:info@topzorg.net" 
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Elias
          </a>
          <br />
          <strong className="text-foreground">{t('learn_improve')}</strong>
        </p>
      </div>
    </Card>
  )
}


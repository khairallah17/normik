'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/routing'

/**
 * Handbook Page Component
 * 
 * Redirects to dashboard since certifications now have their own pages
 */
export default function HandbookPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex flex-1 flex-col gap-6 items-center justify-center">
      <p className="text-muted-foreground">Redirecting to dashboard...</p>
    </div>
  )
}


/**
 * Full Width Layout Component
 * 
 * Layout without sidebar for full-width content
 */

'use client'

import React from 'react'

interface FullWidthLayoutProps {
  children: React.ReactNode
  certification: string
  structure?: any
}

export function FullWidthLayout({ children }: FullWidthLayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="container mx-auto w-full">
        {children}
      </div>
    </div>
  )
}


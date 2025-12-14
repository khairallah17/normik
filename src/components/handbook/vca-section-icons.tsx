'use client'

import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

// General/General Section Icon - Building/Construction
export function GeneralIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <path d="M32 12L20 18V28H16V52H48V28H44V18L32 12Z" fill="#0066CC" stroke="#003366" strokeWidth="2"/>
      <path d="M24 28H40V36H24V28Z" fill="#0066CC"/>
      <path d="M24 40H40V48H24V40Z" fill="#0066CC"/>
      <circle cx="28" cy="32" r="2" fill="white"/>
      <circle cx="36" cy="32" r="2" fill="white"/>
      <circle cx="28" cy="44" r="2" fill="white"/>
      <circle cx="36" cy="44" r="2" fill="white"/>
      <path d="M20 18L32 12L44 18" stroke="#003366" strokeWidth="2" fill="none"/>
    </svg>
  )
}

// Policy Icon - Person in Suit
export function PolicyIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <circle cx="32" cy="20" r="8" fill="#0066CC"/>
      <path d="M16 48C16 40 24 36 32 36C40 36 48 40 48 48V52H16V48Z" fill="#0066CC"/>
      <rect x="20" y="28" width="24" height="20" rx="2" fill="#0066CC"/>
      <path d="M24 32H40M24 36H40M24 40H36" stroke="white" strokeWidth="1.5"/>
    </svg>
  )
}

// Risks Icon - Person on Tightrope with RISK text
export function RisksIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke="#FF6B6B" strokeWidth="3"/>
      <circle cx="32" cy="28" r="6" fill="#FF6B6B"/>
      <path d="M26 28L32 40L38 28" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
      <path d="M28 40L32 48L36 40" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
      <text x="32" y="56" textAnchor="middle" fill="#FF6B6B" fontSize="10" fontWeight="bold">RISK</text>
    </svg>
  )
}

// Competence Icon - Three stick figures (guitar, diploma, wrench)
export function CompetenceIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      {/* Guitar figure */}
      <circle cx="16" cy="16" r="4" fill="#0066CC"/>
      <path d="M12 20V32M20 20V32" stroke="#0066CC" strokeWidth="2"/>
      <rect x="10" y="32" width="12" height="16" rx="2" fill="#0066CC"/>
      <path d="M12 28L20 28" stroke="#0066CC" strokeWidth="2"/>
      {/* Diploma figure */}
      <circle cx="32" cy="16" r="4" fill="#0066CC"/>
      <path d="M28 20V32M36 20V32" stroke="#0066CC" strokeWidth="2"/>
      <rect x="26" y="32" width="12" height="16" rx="2" fill="#0066CC"/>
      <rect x="28" y="36" width="8" height="6" rx="1" fill="white"/>
      {/* Wrench figure */}
      <circle cx="48" cy="16" r="4" fill="#0066CC"/>
      <path d="M44 20V32M52 20V32" stroke="#0066CC" strokeWidth="2"/>
      <rect x="42" y="32" width="12" height="16" rx="2" fill="#0066CC"/>
      <path d="M46 36L50 40M50 36L46 40" stroke="white" strokeWidth="2"/>
    </svg>
  )
}

// OHS Awareness Icon - Three people with speech bubbles
export function OHSAwarenessIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      {/* Three people */}
      <circle cx="16" cy="40" r="5" fill="#0066CC"/>
      <path d="M11 45V52H21V45" stroke="#0066CC" strokeWidth="2" fill="none"/>
      <rect x="9" y="52" width="14" height="8" rx="2" fill="#0066CC"/>
      <circle cx="32" cy="40" r="5" fill="#0066CC"/>
      <path d="M27 45V52H37V45" stroke="#0066CC" strokeWidth="2" fill="none"/>
      <rect x="25" y="52" width="14" height="8" rx="2" fill="#0066CC"/>
      <circle cx="48" cy="40" r="5" fill="#0066CC"/>
      <path d="M43 45V52H53V45" stroke="#0066CC" strokeWidth="2" fill="none"/>
      <rect x="41" y="52" width="14" height="8" rx="2" fill="#0066CC"/>
      {/* Speech bubbles */}
      <ellipse cx="20" cy="24" rx="8" ry="6" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <path d="M16 28L12 32H16V28Z" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <ellipse cx="36" cy="20" rx="8" ry="6" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <path d="M32 24L28 28H32V24Z" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <ellipse cx="52" cy="24" rx="8" ry="6" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <path d="M48 28L44 32H48V28Z" fill="white" stroke="#0066CC" strokeWidth="2"/>
    </svg>
  )
}

// OHS Project Plan Icon - Document with pencil
export function OHSProjectPlanIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <rect x="16" y="12" width="32" height="40" rx="2" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <line x1="20" y1="20" x2="44" y2="20" stroke="#0066CC" strokeWidth="1.5"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke="#0066CC" strokeWidth="1.5"/>
      <line x1="20" y1="36" x2="40" y2="36" stroke="#0066CC" strokeWidth="1.5"/>
      <path d="M40 16L48 24L44 28L36 20L40 16Z" fill="#0066CC" stroke="#003366" strokeWidth="1.5"/>
      <line x1="44" y1="24" x2="48" y2="20" stroke="#003366" strokeWidth="1.5"/>
    </svg>
  )
}

// Emergency Situations Icon - Three people in green circle with arrows
export function EmergencySituationsIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <circle cx="32" cy="32" r="20" fill="#22C55E" stroke="#16A34A" strokeWidth="2"/>
      {/* Three people */}
      <circle cx="28" cy="28" r="3" fill="white"/>
      <path d="M25 31V36H31V31" stroke="white" strokeWidth="1.5" fill="none"/>
      <rect x="24" y="36" width="8" height="6" rx="1" fill="white"/>
      <circle cx="36" cy="28" r="3" fill="white"/>
      <path d="M33 31V36H39V31" stroke="white" strokeWidth="1.5" fill="none"/>
      <rect x="32" y="36" width="8" height="6" rx="1" fill="white"/>
      <circle cx="32" cy="20" r="3" fill="white"/>
      <path d="M29 23V28H35V23" stroke="white" strokeWidth="1.5" fill="none"/>
      <rect x="28" y="28" width="8" height="6" rx="1" fill="white"/>
      {/* Arrows pointing outwards */}
      <path d="M12 32L8 32M56 32L60 32" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 32L12 28M8 32L12 36" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 12L32 8M32 56L32 60" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 8L28 12M32 8L36 12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// Inspections Icon - Clipboard/Checklist
export function InspectionsIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <rect x="18" y="10" width="28" height="44" rx="2" fill="white" stroke="#0066CC" strokeWidth="2"/>
      <rect x="20" y="14" width="24" height="4" rx="1" fill="#0066CC"/>
      <rect x="20" y="22" width="20" height="2" rx="1" fill="#0066CC" opacity="0.6"/>
      <rect x="20" y="28" width="20" height="2" rx="1" fill="#0066CC" opacity="0.6"/>
      <rect x="20" y="34" width="20" height="2" rx="1" fill="#0066CC" opacity="0.6"/>
      <circle cx="24" cy="40" r="2" fill="#22C55E"/>
      <path d="M22 40L23.5 41.5L26 39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="20" y="46" width="20" height="2" rx="1" fill="#0066CC" opacity="0.6"/>
      <rect x="20" y="52" width="20" height="2" rx="1" fill="#0066CC" opacity="0.6"/>
      <rect x="22" y="8" width="20" height="6" rx="1" fill="#0066CC"/>
    </svg>
  )
}

// Health Icon - Person doing handstand
export function HealthIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <circle cx="32" cy="20" r="6" fill="#0066CC"/>
      <path d="M26 26L32 48L38 26" stroke="#0066CC" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M26 26L20 32M38 26L44 32" stroke="#0066CC" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 48L28 52L32 56L36 52L32 48Z" fill="#0066CC"/>
      <circle cx="28" cy="30" r="2" fill="#22C55E"/>
      <circle cx="36" cy="30" r="2" fill="#22C55E"/>
    </svg>
  )
}

// Resources Icon - Person with gears and coins
export function ResourcesIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <circle cx="32" cy="40" r="8" fill="#0066CC"/>
      <path d="M24 40V48H40V40" stroke="#003366" strokeWidth="2" fill="none"/>
      <rect x="22" y="48" width="20" height="8" rx="2" fill="#0066CC"/>
      {/* Gears */}
      <circle cx="16" cy="20" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
      <circle cx="16" cy="20" r="2" fill="#FFA500"/>
      <rect x="15" y="14" width="2" height="4" rx="1" fill="#FFA500"/>
      <rect x="15" y="22" width="2" height="4" rx="1" fill="#FFA500"/>
      <rect x="10" y="19" width="4" height="2" rx="1" fill="#FFA500"/>
      <rect x="18" y="19" width="4" height="2" rx="1" fill="#FFA500"/>
      <circle cx="48" cy="20" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
      <circle cx="48" cy="20" r="2" fill="#FFA500"/>
      <rect x="47" y="14" width="2" height="4" rx="1" fill="#FFA500"/>
      <rect x="47" y="22" width="2" height="4" rx="1" fill="#FFA500"/>
      <rect x="42" y="19" width="4" height="2" rx="1" fill="#FFA500"/>
      <rect x="50" y="19" width="4" height="2" rx="1" fill="#FFA500"/>
      {/* Coins */}
      <circle cx="20" cy="52" r="3" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
      <circle cx="44" cy="52" r="3" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
    </svg>
  )
}

// Procurement Services Icon - Person with hard hat
export function ProcurementServicesIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <circle cx="32" cy="28" r="6" fill="#FFA500"/>
      <path d="M26 34V48H38V34" stroke="#FFA500" strokeWidth="2" fill="none"/>
      <rect x="24" y="48" width="16" height="8" rx="2" fill="#FFA500"/>
      {/* Hard hat */}
      <ellipse cx="32" cy="22" rx="10" ry="6" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
      <rect x="28" y="16" width="8" height="4" rx="1" fill="#FFA500"/>
      <line x1="30" y1="18" x2="34" y2="18" stroke="white" strokeWidth="1"/>
    </svg>
  )
}

// OHS Incidents Icon - First aid kit
export function OHSIncidentsIcon({ className = "w-16 h-16", size = 64 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#E6F2FF"/>
      <rect x="20" y="16" width="24" height="32" rx="2" fill="white" stroke="#DC2626" strokeWidth="3"/>
      <circle cx="32" cy="24" r="4" fill="#DC2626"/>
      <line x1="32" y1="20" x2="32" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="24" x2="36" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <rect x="24" y="32" width="16" height="12" rx="1" fill="#DC2626" opacity="0.3"/>
      <line x1="24" y1="36" x2="40" y2="36" stroke="#DC2626" strokeWidth="1"/>
      <line x1="24" y1="40" x2="40" y2="40" stroke="#DC2626" strokeWidth="1"/>
    </svg>
  )
}

// Helper function to get icon by section key
export function getVCAIcon(sectionKey: string, props?: IconProps) {
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    'general': GeneralIcon,
    'policy': PolicyIcon,
    'risks': RisksIcon,
    'competence': CompetenceIcon,
    'ohs_awareness': OHSAwarenessIcon,
    'ohs_project_plan': OHSProjectPlanIcon,
    'emergency_situations': EmergencySituationsIcon,
    'inspections': InspectionsIcon,
    'health': HealthIcon,
    'resources': ResourcesIcon,
    'procurement_services': ProcurementServicesIcon,
    'ohs_incidents': OHSIncidentsIcon,
  }
  
  const IconComponent = iconMap[sectionKey] || GeneralIcon
  return <IconComponent {...props} />
}


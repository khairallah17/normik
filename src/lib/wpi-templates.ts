// Standard WPI Template Definitions
// These templates are used when creating a new checklist from the standard templates

export interface TemplateCategory {
  id: string
  name: string
  questions: TemplateQuestion[]
}

export interface TemplateQuestion {
  id: string
  text: string
}

export interface StandardTemplate {
  id: string
  name: string
  categories: TemplateCategory[]
}

// Helper function to generate unique IDs
function generateId(prefix: string, index: number): string {
  return `${prefix}-${index}`
}

// 1. Lege lijst (Empty list)
const emptyTemplate: StandardTemplate = {
  id: 'empty',
  name: 'Lege lijst',
  categories: [],
}

// 2. Bodemsanering BASISKLASSE
const soilBasicTemplate: StandardTemplate = {
  id: 'soil-basic',
  name: 'Bodemsanering BASISKLASSE',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Hygienische voorzieningen',
      questions: [
        { id: generateId('q', 1), text: 'Schaftkeet aanwezig?' },
        { id: generateId('q', 2), text: 'Schaftkeet schoon en opgeruimd?' },
        { id: generateId('q', 3), text: 'Schaftkeet juist gebruikt (geen verontreinigde kleding en geen gereedschap aanwezig)?' },
        { id: generateId('q', 4), text: 'Laarzenspoelbak aanwezig?' },
        { id: generateId('q', 5), text: 'Laarzenspoelbak juist gebruikt (buiten en op een logische plek, medewerkers spoelen de laarzen voldoende?' },
        { id: generateId('q', 6), text: 'Toilet en wasgelegenheid juist gebruikt (vuile kleding uitgetrokken en schoongehouden)?' },
        { id: generateId('q', 7), text: 'Toilet en wasgelegenheid aanwezig?' },
      ],
    },
    {
      id: generateId('cat', 2),
      name: 'Locatie',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Dossier',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Deskundigheid',
      questions: [],
    },
  ],
}

// 3. Bodemsanering met T- en F-KLASSEN
const soilTfTemplate: StandardTemplate = {
  id: 'soil-tf',
  name: 'Bodemsanering met T- en F-KLASSEN',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Hygienische voorzieningen',
      questions: [
        { id: generateId('q', 1), text: 'Schaftkeet aanwezig?' },
        { id: generateId('q', 2), text: 'Schaftkeet schoon en opgeruimd?' },
        { id: generateId('q', 3), text: 'Schaftkeet juist gebruikt (geen verontreinigde kleding en geen gereedschap aanwezig)?' },
        { id: generateId('q', 4), text: 'Laarzenspoelbak aanwezig?' },
        { id: generateId('q', 5), text: 'Laarzenspoelbak juist gebruikt (buiten en op een logische plek, medewerkers spoelen de laarzen voldoende?' },
        { id: generateId('q', 6), text: 'Toilet en wasgelegenheid juist gebruikt (vuile kleding uitgetrokken en schoongehouden)?' },
        { id: generateId('q', 7), text: 'Toilet en wasgelegenheid aanwezig?' },
      ],
    },
    {
      id: generateId('cat', 2),
      name: 'Locatie',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Dossier',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Deskundigheid',
      questions: [],
    },
  ],
}

// 4. Sloopwerk (SVMS 007)
const demolitionTemplate: StandardTemplate = {
  id: 'demolition',
  name: 'Sloopwerk (SVMS 007)',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Hygienische voorzieningen',
      questions: [
        { id: generateId('q', 1), text: 'Schaftkeet aanwezig?' },
        { id: generateId('q', 2), text: 'Schaftkeet schoon en opgeruimd?' },
        { id: generateId('q', 3), text: 'Schaftkeet juist gebruikt (geen verontreinigde kleding en geen gereedschap aanwezig)?' },
        { id: generateId('q', 4), text: 'Laarzenspoelbak aanwezig?' },
        { id: generateId('q', 5), text: 'Laarzenspoelbak juist gebruikt (buiten en op een logische plek, medewerkers spoelen de laarzen voldoende?' },
        { id: generateId('q', 6), text: 'Toilet en wasgelegenheid juist gebruikt (vuile kleding uitgetrokken en schoongehouden)?' },
        { id: generateId('q', 7), text: 'Toilet en wasgelegenheid aanwezig?' },
      ],
    },
    {
      id: generateId('cat', 2),
      name: 'Locatie',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Dossier',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Deskundigheid',
      questions: [],
    },
  ],
}

// 5. Werkplekinspectie Algemeen
const generalTemplate: StandardTemplate = {
  id: 'general',
  name: 'Werkplekinspectie Algemeen',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Orde en netheid',
      questions: [
        { id: generateId('q', 1), text: 'Werkplek' },
        { id: generateId('q', 2), text: 'Opslag' },
        { id: generateId('q', 3), text: 'Schaftgelegenheid' },
        { id: generateId('q', 4), text: 'Toilet' },
      ],
    },
    {
      id: generateId('cat', 2),
      name: 'Algemene middelen en voorzieningen',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Arbeidsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Grondwerk',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Kwaliteit',
      questions: [],
    },
    {
      id: generateId('cat', 6),
      name: 'Afzetting werkgebied',
      questions: [],
    },
    {
      id: generateId('cat', 7),
      name: 'Veiligheid en gezondheid (eigen medewerkers en derden)',
      questions: [],
    },
    {
      id: generateId('cat', 8),
      name: 'Milieu',
      questions: [],
    },
  ],
}

// 6. WPI SC Asbestinventarisatie
const scaInventoryTemplate: StandardTemplate = {
  id: 'sca-inventory',
  name: 'WPI SC Asbestinventarisatie',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Artikel 7. Samenwerking, onverenigbaarheid van functies en uitbesteding',
      questions: [],
    },
    {
      id: generateId('cat', 2),
      name: 'Artikel 8. Personeel',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Artikel 12. Kwaliteitssysteem',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Artikel 13. Faciliteiten en arbeidsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Artikel 14. Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 6),
      name: 'Artikel 16. Vooronderzoek asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 7),
      name: 'Artikel 17. Asbestinventarisatieplan',
      questions: [],
    },
    {
      id: generateId('cat', 8),
      name: 'Artikel 18. Voorbereiding en melding asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 9),
      name: 'Artikel 19. Uitvoering asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 10),
      name: 'Artikel 20. Monsterneming en analyse',
      questions: [],
    },
    {
      id: generateId('cat', 11),
      name: 'Artikel 21. Maatregelen bij het aantreffen van beschadigd asbestverdacht materiaal',
      questions: [],
    },
  ],
}

// 7. WPI SC Asbestverwijderen
const scaRemovalTemplate: StandardTemplate = {
  id: 'sca-removal',
  name: 'WPI SC Asbestverwijderen',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Artikel 7. Samenwerking, onverenigbaarheid van functies en uitbesteding',
      questions: [],
    },
    {
      id: generateId('cat', 2),
      name: 'Artikel 8. Personeel',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Artikel 12. Kwaliteitssysteem',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Artikel 13. Faciliteiten en arbeidsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Artikel 14. Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 6),
      name: 'Artikel 16. Vooronderzoek asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 7),
      name: 'Artikel 17. Asbestinventarisatieplan',
      questions: [],
    },
    {
      id: generateId('cat', 8),
      name: 'Artikel 18. Voorbereiding en melding asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 9),
      name: 'Artikel 19. Uitvoering asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 10),
      name: 'Artikel 20. Monsterneming en analyse',
      questions: [],
    },
    {
      id: generateId('cat', 11),
      name: 'Artikel 21. Maatregelen bij het aantreffen van beschadigd asbestverdacht materiaal',
      questions: [],
    },
  ],
}

// 8. WPI SC Asbestverwijderen (verkort)
const scaRemovalShortTemplate: StandardTemplate = {
  id: 'sca-removal-short',
  name: 'WPI SC Asbestverwijderen (verkort)',
  categories: [
    {
      id: generateId('cat', 1),
      name: 'Artikel 7. Samenwerking, onverenigbaarheid van functies en uitbesteding',
      questions: [],
    },
    {
      id: generateId('cat', 2),
      name: 'Artikel 8. Personeel',
      questions: [],
    },
    {
      id: generateId('cat', 3),
      name: 'Artikel 12. Kwaliteitssysteem',
      questions: [],
    },
    {
      id: generateId('cat', 4),
      name: 'Artikel 13. Faciliteiten en arbeidsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 5),
      name: 'Artikel 14. Persoonlijke beschermingsmiddelen',
      questions: [],
    },
    {
      id: generateId('cat', 6),
      name: 'Artikel 16. Vooronderzoek asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 7),
      name: 'Artikel 17. Asbestinventarisatieplan',
      questions: [],
    },
    {
      id: generateId('cat', 8),
      name: 'Artikel 18. Voorbereiding en melding asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 9),
      name: 'Artikel 19. Uitvoering asbestinventarisatie',
      questions: [],
    },
    {
      id: generateId('cat', 10),
      name: 'Artikel 20. Monsterneming en analyse',
      questions: [],
    },
    {
      id: generateId('cat', 11),
      name: 'Artikel 21. Maatregelen bij het aantreffen van beschadigd asbestverdacht materiaal',
      questions: [],
    },
  ],
}

export const standardTemplates: Record<string, StandardTemplate> = {
  'empty': emptyTemplate,
  'soil-basic': soilBasicTemplate,
  'soil-tf': soilTfTemplate,
  'demolition': demolitionTemplate,
  'general': generalTemplate,
  'sca-inventory': scaInventoryTemplate,
  'sca-removal': scaRemovalTemplate,
  'sca-removal-short': scaRemovalShortTemplate,
}

// Helper function to get a template by ID
export function getStandardTemplate(templateId: string): StandardTemplate | undefined {
  return standardTemplates[templateId]
}

// Helper function to create a new template from a standard template with unique IDs
export function createTemplateFromStandard(
  standardTemplateId: string,
  newTemplateId: string
): StandardTemplate | null {
  const standardTemplate = standardTemplates[standardTemplateId]
  if (!standardTemplate) return null

  return {
    id: newTemplateId,
    name: standardTemplate.name,
    categories: standardTemplate.categories.map((cat, catIdx) => ({
      id: `${newTemplateId}-cat-${catIdx + 1}`,
      name: cat.name,
      questions: cat.questions.map((q, qIdx) => ({
        id: `${newTemplateId}-q-${catIdx + 1}-${qIdx + 1}`,
        text: q.text,
      })),
    })),
  }
}

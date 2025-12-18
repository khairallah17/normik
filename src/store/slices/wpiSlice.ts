import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Category {
  id: string
  name: string
  questions: Question[]
}

interface Question {
  id: string
  text: string
}

interface Template {
  id: string
  name: string
  categories: Category[]
  showOpenDeviations: boolean
}

interface WpiState {
  templates: Template[]
  currentTemplate: Template | null
  templateEditState: {
    templateName: string
    isEditingName: boolean
    showOpenDeviations: boolean
    categories: Category[]
    editingCategoryId: string | null
    editingCategoryName: string
    openCategories: Record<string, boolean>
    newCategoryName: string
    newQuestionText: Record<string, string>
  }
  scheduler: {
    selectedYear: string
    selectedType: string
    geplandChecked: boolean
    nietUitgevoerdChecked: boolean
    filters: {
      planDatum: string
      type: string | undefined
      titel: string
      nr: string
      naamInspecteur: string
      locatie: string
    }
    pageSize: string
  }
  settings: {
    activeTab: string
    isContactDialogOpen: boolean
    isLocationDialogOpen: boolean
    pageSize: string
    contactForm: {
      voornaam: string
      tussenvoegsel: string
      achternaam: string
      email: string
    }
    locationForm: {
      locatieCode: string
      omschrijving: string
    }
  }
  loading: boolean
  error: string | null
}

const initialState: WpiState = {
  templates: [],
  currentTemplate: null,
  templateEditState: {
    templateName: 'Nieuwe werkplekinspectie template',
    isEditingName: false,
    showOpenDeviations: false,
    categories: [],
    editingCategoryId: null,
    editingCategoryName: '',
    openCategories: {},
    newCategoryName: '',
    newQuestionText: {},
  },
  scheduler: {
    selectedYear: '2025',
    selectedType: 'all',
    geplandChecked: false,
    nietUitgevoerdChecked: false,
    filters: {
      planDatum: '',
      type: undefined,
      titel: '',
      nr: '',
      naamInspecteur: '',
      locatie: '',
    },
    pageSize: '30',
  },
  settings: {
    activeTab: 'contacts',
    isContactDialogOpen: false,
    isLocationDialogOpen: false,
    pageSize: '30',
    contactForm: {
      voornaam: '',
      tussenvoegsel: '',
      achternaam: '',
      email: '',
    },
    locationForm: {
      locatieCode: '',
      omschrijving: '',
    },
  },
  loading: false,
  error: null,
}

export const wpiSlice = createSlice({
  name: 'wpi',
  initialState,
  reducers: {
    // Templates
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload
    },
    addTemplate: (state, action: PayloadAction<Template>) => {
      state.templates.push(action.payload)
    },
    updateTemplate: (state, action: PayloadAction<Template>) => {
      const index = state.templates.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
      }
    },
    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload)
    },
    setCurrentTemplate: (state, action: PayloadAction<Template | null>) => {
      state.currentTemplate = action.payload
      if (action.payload) {
        state.templateEditState = {
          ...state.templateEditState,
          templateName: action.payload.name,
          categories: action.payload.categories,
          showOpenDeviations: action.payload.showOpenDeviations,
        }
      }
    },
    // Template Edit State
    setTemplateName: (state, action: PayloadAction<string>) => {
      state.templateEditState.templateName = action.payload
    },
    setIsEditingName: (state, action: PayloadAction<boolean>) => {
      state.templateEditState.isEditingName = action.payload
    },
    setShowOpenDeviations: (state, action: PayloadAction<boolean>) => {
      state.templateEditState.showOpenDeviations = action.payload
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.templateEditState.categories = action.payload
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.templateEditState.categories.push(action.payload)
      state.templateEditState.openCategories[action.payload.id] = true
    },
    updateCategory: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const category = state.templateEditState.categories.find((c) => c.id === action.payload.id)
      if (category) {
        category.name = action.payload.name
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.templateEditState.categories = state.templateEditState.categories.filter(
        (c) => c.id !== action.payload
      )
      delete state.templateEditState.openCategories[action.payload]
    },
    setEditingCategoryId: (state, action: PayloadAction<string | null>) => {
      state.templateEditState.editingCategoryId = action.payload
    },
    setEditingCategoryName: (state, action: PayloadAction<string>) => {
      state.templateEditState.editingCategoryName = action.payload
    },
    toggleCategoryOpen: (state, action: PayloadAction<string>) => {
      state.templateEditState.openCategories[action.payload] =
        !state.templateEditState.openCategories[action.payload]
    },
    setCategoryOpen: (state, action: PayloadAction<{ id: string; open: boolean }>) => {
      state.templateEditState.openCategories[action.payload.id] = action.payload.open
    },
    setNewCategoryName: (state, action: PayloadAction<string>) => {
      state.templateEditState.newCategoryName = action.payload
    },
    addQuestion: (state, action: PayloadAction<{ categoryId: string; question: Question }>) => {
      const category = state.templateEditState.categories.find(
        (c) => c.id === action.payload.categoryId
      )
      if (category) {
        category.questions.push(action.payload.question)
      }
    },
    deleteQuestion: (state, action: PayloadAction<{ categoryId: string; questionId: string }>) => {
      const category = state.templateEditState.categories.find(
        (c) => c.id === action.payload.categoryId
      )
      if (category) {
        category.questions = category.questions.filter((q) => q.id !== action.payload.questionId)
      }
    },
    setNewQuestionText: (state, action: PayloadAction<{ categoryId: string; text: string }>) => {
      state.templateEditState.newQuestionText[action.payload.categoryId] = action.payload.text
    },
    clearNewQuestionText: (state, action: PayloadAction<string>) => {
      delete state.templateEditState.newQuestionText[action.payload]
    },
    // Scheduler
    setSelectedYear: (state, action: PayloadAction<string>) => {
      state.scheduler.selectedYear = action.payload
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.scheduler.selectedType = action.payload
    },
    setGeplandChecked: (state, action: PayloadAction<boolean>) => {
      state.scheduler.geplandChecked = action.payload
    },
    setNietUitgevoerdChecked: (state, action: PayloadAction<boolean>) => {
      state.scheduler.nietUitgevoerdChecked = action.payload
    },
    setSchedulerFilter: (state, action: PayloadAction<Partial<WpiState['scheduler']['filters']>>) => {
      state.scheduler.filters = { ...state.scheduler.filters, ...action.payload }
    },
    clearSchedulerFilters: (state) => {
      state.scheduler.filters = initialState.scheduler.filters
    },
    setSchedulerPageSize: (state, action: PayloadAction<string>) => {
      state.scheduler.pageSize = action.payload
    },
    // Settings
    setSettingsActiveTab: (state, action: PayloadAction<string>) => {
      state.settings.activeTab = action.payload
    },
    setContactDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.settings.isContactDialogOpen = action.payload
    },
    setLocationDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.settings.isLocationDialogOpen = action.payload
    },
    setSettingsPageSize: (state, action: PayloadAction<string>) => {
      state.settings.pageSize = action.payload
    },
    setContactForm: (state, action: PayloadAction<Partial<WpiState['settings']['contactForm']>>) => {
      state.settings.contactForm = { ...state.settings.contactForm, ...action.payload }
    },
    clearContactForm: (state) => {
      state.settings.contactForm = initialState.settings.contactForm
    },
    setLocationForm: (state, action: PayloadAction<Partial<WpiState['settings']['locationForm']>>) => {
      state.settings.locationForm = { ...state.settings.locationForm, ...action.payload }
    },
    clearLocationForm: (state) => {
      state.settings.locationForm = initialState.settings.locationForm
    },
    // General
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetTemplateEditState: (state) => {
      state.templateEditState = initialState.templateEditState
    },
  },
})

export const {
  setTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  setCurrentTemplate,
  setTemplateName,
  setIsEditingName,
  setShowOpenDeviations,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setEditingCategoryId,
  setEditingCategoryName,
  toggleCategoryOpen,
  setCategoryOpen,
  setNewCategoryName,
  addQuestion,
  deleteQuestion,
  setNewQuestionText,
  clearNewQuestionText,
  setSelectedYear,
  setSelectedType,
  setGeplandChecked,
  setNietUitgevoerdChecked,
  setSchedulerFilter,
  clearSchedulerFilters,
  setSchedulerPageSize,
  setSettingsActiveTab,
  setContactDialogOpen,
  setLocationDialogOpen,
  setSettingsPageSize,
  setContactForm,
  clearContactForm,
  setLocationForm,
  clearLocationForm,
  setLoading,
  setError,
  resetTemplateEditState,
} = wpiSlice.actions


'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { getTranslation, TranslationKey } from './translations'

export type Language = 'en' | 'th'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  isLanguageSwitcherEnabled: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLanguageSwitcherEnabled: true,
})

interface LanguageProviderProps {
  children: ReactNode
  showLanguageSwitcher?: boolean
}

export function LanguageProvider({ children, showLanguageSwitcher = true }: LanguageProviderProps) {
  // When switcher is disabled, lock to English
  const [language, setLanguageState] = useState<Language>('en')

  const setLanguage = (lang: Language) => {
    if (!showLanguageSwitcher) return
    setLanguageState(lang)
  }

  const t = (key: TranslationKey): string => {
    const effectiveLang = showLanguageSwitcher ? language : 'en'
    return getTranslation(effectiveLang, key)
  }

  return (
    <LanguageContext.Provider
      value={{
        language: showLanguageSwitcher ? language : 'en',
        setLanguage,
        t,
        isLanguageSwitcherEnabled: showLanguageSwitcher,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

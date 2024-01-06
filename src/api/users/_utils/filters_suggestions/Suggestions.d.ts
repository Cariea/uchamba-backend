interface Suggestions {
  careers: CareersSuggestions[]
  skills: {
    hard: HardSkillsSuggestions[]
    soft: SoftSkillsSuggestions[]
  }
  languages: LanguagesSuggestions[]
}

export interface CareersSuggestions {
  id: number
  name: string
  total: number
}

export interface HardSkillsSuggestions {
  id: number
  name: string
  total: number
}

export interface SoftSkillsSuggestions {
  id: number
  name: string
  total: number
}

export interface LanguagesSuggestions {
  id: number
  name: string
  proficientLevel: number
  total: number
}

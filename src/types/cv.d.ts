export interface User {
  userId: number
  name: string
  email: string
  aboutMe: string
  country: string
  state: string
  city: string
  residenceAddress: string
}

export interface Curriculum extends User {
  careerName: string
  cvName: string
  languages: Language[]
  hardSkills: string[]
  softSkills: string[]
  education: Education[]
  workExperiences: WorkExperience[]
}

export interface Language {
  name: string
  proficientLevel: string
}

export interface Skill {
  name: string
  orderIndex: number
}

export interface Education {
  id: string | undefined
  name: string
  universityName: string
  degree: string
  graduationYear: string
}

export interface WorkExperience {
  organizationName: string
  jobTitle: string
  freelancer: boolean
  country: string
  state: string
  city: string
  address: string
  description: string
  entryDate: string
  departureDate: string | null
}

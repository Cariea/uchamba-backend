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
  languages: Language[]
  hardSkills: HardSkills
  softSkills: SoftSkills
  education: Education
  workExperiences: WorkExperience[]
}

export interface Language {
  name: string
  proficientLevel: string
}

export interface HardSkills {
  featured: FeaturedHardSkills[]
  personal: PersonalHardSkills[]
}

export interface FeaturedHardSkills {
  name: string
}

export interface PersonalHardSkills {
  name: string
}

export interface SoftSkills {
  featured: FeaturedSoftSkills[]
  personal: PersonalSoftSkills[]
}

export interface FeaturedSoftSkills {
  name: string
}

export interface PersonalSoftSkills {
  name: string
}

export interface Education {
  featured: FeaturedCareers[]
  personal: PersonalCareers[]
}

export interface FeaturedCareers {
  name: string
  degree: string
  graduationYear: string
}

export interface PersonalCareers {
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

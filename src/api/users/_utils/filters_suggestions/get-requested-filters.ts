import { Request } from 'express'
import { Filters } from './Filters'

export function getRequestedFilters (req: Request): Filters {
  const {
    name,
    country,
    state,
    city,
    careers,
    languages,
    inclusiveLang,
    hskills,
    inclusiveH,
    sskills,
    inclusiveS
  } = req.query

  const filters: Filters = {
    name: (name === '' || name === undefined) ? null : String(name),
    country: (country === '' || country === undefined) ? null : String(country),
    state: (state === '' || state === undefined) ? null : String(state),
    city: (city === '' || city === undefined) ? null : String(city),
    careers: (careers === '' || careers === undefined) ? null : String(careers),
    languages:
      (languages === '' || languages === undefined) ? null : String(languages),
    inclusiveLang:
      (inclusiveLang === '' || inclusiveLang === undefined) ? null : String(inclusiveLang),
    hskills: (hskills === '' || hskills === undefined) ? null : String(hskills),
    inclusiveH: (inclusiveH === '' || inclusiveH === undefined) ? null : String(inclusiveH),
    sskills: (sskills === '' || sskills === undefined) ? null : String(sskills),
    inclusiveS: (inclusiveS === '' || inclusiveS === undefined) ? null : String(inclusiveS)
  }

  return filters
}

const languagesLevelsMap: { [name: string]: { name: string, value: number } } = {
  A1: { name: 'A1', value: 1 },
  A2: { name: 'A2', value: 2 },
  B1: { name: 'B1', value: 3 },
  B2: { name: 'B2', value: 4 },
  C1: { name: 'C1', value: 5 },
  C2: { name: 'C2', value: 6 },
  Native: { name: 'Native', value: 7 }
}
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']

export const languagesLevelList = (languageLevel: string | undefined): string => {
  if (languageLevel === undefined) {
    return levels.join(',')
  }
  if (!levels.includes(languageLevel)) {
    return levels.join(',')
  }
  let levelList = ''
  const languageLevelValue = languagesLevelsMap[languageLevel].value
  for (const llevel in languagesLevelsMap) {
    if (languagesLevelsMap[llevel].value >= languageLevelValue) {
      levelList += `'${languagesLevelsMap[llevel].name}',`
    }
  }
  levelList = levelList.slice(0, -1)

  return levelList
}

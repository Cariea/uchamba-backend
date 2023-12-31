export const transformToCommaSeparatedString = (data: Array<{ user_id: number }>): string => {
  if (data.length === 0) {
    return '0'
  }
  const userIDs = data.map(item => item.user_id)
  return userIDs.join(',')
}

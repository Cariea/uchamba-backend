export const countNumbers = (numbers: string): number => {
  const numbersArray = numbers.split(',')
  const validNumbersArray = numbersArray.filter((num) => !isNaN(Number(num.trim())))
  return validNumbersArray.length
}

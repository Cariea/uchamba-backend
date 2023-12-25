type SpanishMonth =
  | 'Enero'
  | 'Febrero'
  | 'Marzo'
  | 'Abril'
  | 'Mayo'
  | 'Junio'
  | 'Julio'
  | 'Agosto'
  | 'Septiembre'
  | 'Octubre'
  | 'Noviembre'
  | 'Diciembre'

type EnglishMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

enum MonthEnum {
  'January' = 'Enero',
  'February' = 'Febrero',
  'March' = 'Marzo',
  'April' = 'Abril',
  'May' = 'Mayo',
  'June' = 'Junio',
  'July' = 'Julio',
  'August' = 'Agosto',
  'September' = 'Septiembre',
  'October' = 'Octubre',
  'November' = 'Noviembre',
  'December' = 'Diciembre'
}

export function monthToSpanish (month: string): SpanishMonth | string {
  if (isEnglishMonth(month)) {
    return MonthEnum[month] as SpanishMonth
  }
  return month
}

function isEnglishMonth (month: string): month is EnglishMonth {
  return Object.keys(MonthEnum).includes(month)
}

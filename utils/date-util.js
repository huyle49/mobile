import {
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns'

import {
  QUARTER_MONTHS,
  HALF_TERM_MONTHS,
  TERM_MONTHS,
} from '@/utils/constants'

const DATE_FORMAT = 'YYYY-MM'

export const formatDate = d => format(d, DATE_FORMAT)

export const createLastNMonthRange = (n, now = new Date()) => {
  const start = format(subMonths(now, n), DATE_FORMAT)
  const end = format(subMonths(now, 1), DATE_FORMAT)
  return { start, end }
}

export const createNMonthRange = (n, now = new Date()) => {
  const nMonth = addMonths(now, n)
  const start = format(startOfMonth(nMonth), DATE_FORMAT)
  const end = format(endOfMonth(nMonth), DATE_FORMAT)
  return { start, end }
}

export const createNQuarterRange = (n, now = new Date()) => {
  return createNTermRange(n, QUARTER_MONTHS, 3, now)
}

export const createNHalfTermRange = (n, now = new Date()) => {
  return createNTermRange(n, HALF_TERM_MONTHS, 6, now)
}

export const createTermRange = (n, now = new Date()) => {
  return createNTermRange(n, TERM_MONTHS, 12, now)
}

export const createNTermRange = (n, monthRanges, size, now = new Date()) => {
  const targetDate = addMonths(now, n * size)
  const targetMonth = targetDate.getMonth() + 1

  const months = monthRanges.find(months => months.includes(targetMonth))
  const monthIndex = months.indexOf(targetMonth)

  const start = startOfMonth(addMonths(targetDate, -monthIndex))
  const end = endOfMonth(addMonths(targetDate, size - monthIndex - 1))

  return { start: formatDate(start), end: formatDate(end) }
}

/**
 * Calculate difference in months between two days
 * @param {Object<Date>} day1
 * @param {Object<Date>} day2
 * @returns number months
 */
export const diffInMonths = (day1, day2) => {
  let months
  months = (day2.getFullYear() - day1.getFullYear()) * 12
  months -= day1.getMonth()
  months += day2.getMonth()
  return months
}

export function isValidDate(dateObject) {
  return new Date(dateObject).toString() !== 'Invalid Date'
}

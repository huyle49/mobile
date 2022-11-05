import {
  POSITION_ID_SORTING_ORDER,
  FINANCIAL_TERM_CONFIGS,
  DEFAULT_PERSONAL_ACHIEVEMENT_PAGE_SIZE,
} from '@/utils/constants'

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
}

export function genSearchParams(params) {
  return Object.keys(params).reduce((searchParams, name) => {
    const isNullish = (params[name] ?? 'nullish') === 'nullish' // TODO: check value is null or undefined
    if (isNullish) return [...searchParams]
    if (Array.isArray(params[name])) {
      return [...searchParams, ...params[name].map(value => [name, value])]
    }

    return [...searchParams, [name, params[name]]]
  }, [])
}

export function removeUndefinedValue(object) {
  const obj = {}
  for (const key in object) {
    if (object[key] !== undefined) {
      obj[key] = object[key]
    }
  }
  return obj
}

export function isThisMonth(from = new Date(), to = new Date()) {
  try {
    const fromMonth = new Date(from).getMonth()
    const toMonth = new Date(to).getMonth()
    if (fromMonth !== toMonth) return false

    const currentMonth = new Date().getMonth()
    return fromMonth === currentMonth
  } catch (_err) {
    return false
  }
}

export function isLast1Month(from = new Date(), to = new Date()) {
  try {
    const fromMonth = new Date(from).getMonth()
    const toMonth = new Date(to).getMonth()
    if (fromMonth !== toMonth) return false

    const current = new Date()
    current.setMonth(current.getMonth() - 1)
    const last1Month = current.getMonth()
    return fromMonth === last1Month
  } catch (_err) {
    return false
  }
}

export function isSameMonth(from = new Date(), to = new Date()) {
  const fromYearMonth = new Date(from)
  const toYearMonth = new Date(to)

  const fromMonth = fromYearMonth.getMonth()
  const fromYear = fromYearMonth.getFullYear()
  const toMonth = toYearMonth.getMonth()
  const toYear = toYearMonth.getFullYear()

  return fromMonth === toMonth && fromYear === toYear
}

export function comparePosition(key) {
  return function (a, b) {
    const first =
      String(a[key]) in POSITION_ID_SORTING_ORDER
        ? POSITION_ID_SORTING_ORDER[a[key]]
        : Number.MAX_SAFE_INTEGER
    const second =
      String(b[key]) in POSITION_ID_SORTING_ORDER
        ? POSITION_ID_SORTING_ORDER[b[key]]
        : Number.MAX_SAFE_INTEGER

    let result = 0
    if (first < second) result = -1
    else if (first > second) result = 1
    return result
  }
}

export function numberWithComma(num) {
  if (!num || !Number(num)) return num
  return Number(num).toLocaleString()
}

export function getTerm(
  year = new Date().getFullYear(),
  startYear = FINANCIAL_TERM_CONFIGS.startYear,
  startTermMonth = FINANCIAL_TERM_CONFIGS.startTermMonth
) {
  const currentLocalMonth = new Date().getMonth()
  const diffYear = year - startYear
  return currentLocalMonth >= startTermMonth ? diffYear + 1 : diffYear
}

export function formatYearMonth(yearMonth) {
  return yearMonth.slice(0, 4) + '.' + yearMonth.slice(4)
}

export const getRecordsOfPage = (
  records,
  pageIndex = 1,
  pageSize = DEFAULT_PERSONAL_ACHIEVEMENT_PAGE_SIZE
) => {
  const totalRecords = records?.length
  if (!Array.isArray(records) || !totalRecords || pageIndex < 1) return

  const skip = (pageIndex - 1) * pageSize
  let end = pageIndex * pageSize

  if (end > totalRecords) end = totalRecords

  return records.slice(skip, end)
}

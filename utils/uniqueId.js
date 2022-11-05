let lastId = 0

export default function (prefix = 'uid_') {
  lastId++
  return `${prefix}${lastId}`
}

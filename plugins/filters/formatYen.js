import Vue from 'vue'
import { numberWithComma } from '@/utils/common'

export default () => {
  Vue.filter('formatYen', function (value) {
    if (value === 0) return `¥0`
    if (!value) return ''
    if (!isNaN(value)) return `¥${numberWithComma(value)}`
    return value
  })
}

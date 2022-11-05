import { apis } from '@/apis'

export function getInterests() {
  return apis.mobileApi.get(`api/interests`).json()
}

export function getJob() {
  return apis.mobileApi.get(`api/job`).json()
}

export function getKbs(params) {
  return apis.mobileApi.get(`api/kbs`, { searchParams: params }).json()
}

import { apis } from '@/apis'

export function getInterests() {
  return apis.mobileApi.get(`api/interests`).json()
}

export function getJob() {
  return apis.mobileApi.get(`api/job`).json()
}

export function getPrice() {
  return apis.mobileApi.get(`api/price`).json()
}

export function getModel() {
  return apis.mobileApi.get(`api/models`).json()
}

export function getColor() {
  return apis.mobileApi.get(`api/color`).json()
}

export function getRam() {
  return apis.mobileApi.get(`api/ram`).json()
}

export function getKbs(params) {
  return apis.mobileApi.get(`api/kbs`, { searchParams: params }).json()
}

export function getMobile(params) {
  return apis.mobileApi.get(`api/mobile`, { searchParams: params }).json()
}

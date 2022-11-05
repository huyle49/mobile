import ky from 'ky-universal' // eslint-disable-line
import ConfirmPopup from '@/components/popups/confirm-popup'

export const apis = {}
export const tasks = []

function createAPI(baseURL) {
  return ky.create({
    prefixUrl: baseURL,
    timeout: 90000,
    credentials: 'include',
    hooks: {
      beforeRequest: [() => tasks.push(1)],
      beforeRetry: [
        () => {
          tasks.pop()
          return ky.stop
        },
      ],
      afterResponse: [
        (req, options, res) => {
          tasks.pop()
          if (res.status === 401) {
            window.$nuxt.$emit('showPopup', {
              component: ConfirmPopup,
              properties: {
                message: `ログインセッションの有効期限が切れています。
                続行するには、ページをリロードしてください。`,
                disableNgButton: true,
              },
              on: {
                ok: () => {
                  refreshIapSession()

                  window.$nuxt.$emit('hidePopup')

                  location.reload()
                },
              },
            })
          }
        },
      ],
    },
  })
}

function refreshIapSession() {
  // TODO: handle token expired
}

export default function ({ $config }) {
  if (process.client) {
    apis.mobileApi = createAPI($config.API_BASE_URL)
  }
}

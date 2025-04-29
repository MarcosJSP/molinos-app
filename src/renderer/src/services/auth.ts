import axios from 'axios'

const BASE_AUTH_URL = import.meta.env.VITE_AUTH_PROXY_URL

const AUTH_API = {
  AUTHORIZE: `${BASE_AUTH_URL}/authorize/`,
  TOKEN: `${BASE_AUTH_URL}/access_token/`
}

type TokenResponse = {
  access_token: string
  expires_in: string
  refresh_token: string
}

type TokenData = {
  accessToken: string
  refreshToken: string
  expirationDate: string
}

type GetTokenParams = { code: string } | { refreshToken: string }
const getTokenData = async (params: GetTokenParams): Promise<TokenData> => {
  const body: Record<string, string> = {}
  if ('code' in params) {
    body.code = params.code
  } else if ('refreshToken' in params) {
    body.refresh_token = params.refreshToken
  }
  const req = await axios.post<TokenResponse>(AUTH_API.TOKEN, body)
  const { access_token, refresh_token, expires_in } = req.data
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    expirationDate: new Date(Date.now() + parseInt(expires_in) * 1000).toISOString()
  }
}

const login = async (code: string): Promise<TokenData> => {
  return getTokenData({ code })
}

const refreshToken = async (refreshToken: string): Promise<TokenData> => {
  return getTokenData({ refreshToken })
}

export type { TokenData }
export { AUTH_API, login, refreshToken }

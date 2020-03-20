import Cookies from 'js-cookie'

const TokenKey = 'token'
const AidKey = 'aid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAid() {
  return Cookies.get(AidKey)
}

export function setAid(aid) {
  return Cookies.set(AidKey, aid)
}

export function removeAid() {
  return Cookies.remove(AidKey)
}



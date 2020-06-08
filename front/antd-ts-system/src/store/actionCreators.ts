import { UserState } from './reducers/user'

export const toogleHeaderType = (headerType: string) => ({
  type: 'toggleHeaderType',
  headerType,
})

export const toogleSiderMenu = (list: []) => ({
  type: 'toggleSiderMenu',
  list,
})

export const setUserInfo = (info: UserState) => ({
  type: 'setUserInfo',
  user: info,
})

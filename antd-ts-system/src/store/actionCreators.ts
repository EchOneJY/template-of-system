export const toogleHeaderType = (headerType:string) => ({
  type: 'toggleHeaderType',
  headerType
})

export const toogleSiderMenu = (list:[]) => ({
  type: 'toggleSiderMenu',
  list
})
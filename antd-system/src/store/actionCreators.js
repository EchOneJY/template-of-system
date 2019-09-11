import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM,TOGGLE_SIDER_MENU,TOGGLE_HEADER_TYPE } from './actionTypes'

export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

export const addItemAction = ()=>({
    type:ADD_ITEM
})

export const deleteItemAction = (index)=>({
    type:DELETE_ITEM,
    index
})

export const toogleHeaderType = (headerType)=>({
    type:TOGGLE_HEADER_TYPE,
    headerType
})

export const toogleSiderMenu = (list)=>({
    type:TOGGLE_SIDER_MENU,
    list
})
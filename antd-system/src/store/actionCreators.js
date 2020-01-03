import {
  CHANGE_INPUT,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_SIDER_MENU,
  TOGGLE_HEADER_TYPE,
  INIT_LIST_ACTION
} from './actionTypes'
import { queryTodoList } from '@/api'

export const changeInputAction = value => ({
  type: CHANGE_INPUT,
  value
})

export const addItemAction = () => ({
  type: ADD_ITEM
})

export const deleteItemAction = index => ({
  type: DELETE_ITEM,
  index
})

export const toogleHeaderType = headerType => ({
  type: TOGGLE_HEADER_TYPE,
  headerType
})

export const toogleSiderMenu = list => ({
  type: TOGGLE_SIDER_MENU,
  list
})

export const initListAction = list => ({
  type: INIT_LIST_ACTION,
  list
})

//redux-thunk
export const initListAsync = () => {
  return async (dispatch) => {
    const response = await queryTodoList()
    if(response.data.code === 1) {
      const action = initListAction(response.data.data)
      dispatch(action)
    }
  }
}
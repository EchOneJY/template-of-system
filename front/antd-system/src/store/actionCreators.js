import {
  CHANGE_INPUT,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_SIDER_MENU,
  TOGGLE_HEADER_TYPE,
  INIT_LIST_ACTION,
  INIT_LIST_ACTION_SAGA,
  TOGGLE_TEXT_VAL,
  TOGGLE_SELECT_TAB
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

export const initListActionSaga = () => ({
  type: INIT_LIST_ACTION_SAGA
})

export const toogleTextVal = value => ({
  type: TOGGLE_TEXT_VAL,
  value
})

export const toogleSelectTab = value => ({
  type: TOGGLE_SELECT_TAB,
  value
})

//redux-thunk
export const initListActionThunk = () => {
  return async dispatch => {
    const data = {
      type: '02'
    }
    const response = await queryTodoList(data)
    if (response.data.code === 1) {
      const action = initListAction(response.data.data)
      dispatch(action)
    }
  }
}

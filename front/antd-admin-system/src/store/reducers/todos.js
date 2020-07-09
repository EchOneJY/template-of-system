import { combineReducers } from 'redux'
import {
  ACTION_CHANGE_TODO_INPUT,
  ACTION_ADD_TODO_ITEM,
  ACTION_DELETE_TODO_ITEM
} from '../actions'

export function inputValue(state = '', action) {
  const { type, payload } = action
  switch (type) {
    case ACTION_CHANGE_TODO_INPUT:
      return payload
    default:
  }
  return state
}

export function todoList(
  state = ['早上4点起床，锻炼身体', '中午下班游泳一小时'],
  action
) {
  const { type, payload } = action
  switch (type) {
    case ACTION_ADD_TODO_ITEM:
      return state.concat(payload)
    case ACTION_DELETE_TODO_ITEM:
      const newState = state.slice()
      newState.splice(payload, 1)
      return newState
    default:
  }
  return state
}

export default combineReducers({
  inputValue,
  todoList
})

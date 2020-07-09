export const ACTION_CHANGE_TODO_INPUT = 'CHANGE_TODO_INPUT'
export const ACTION_ADD_TODO_ITEM = 'ADD_TODO_ITEM'
export const ACTION_DELETE_TODO_ITEM = 'DELETE_TODO_ITEM '

export function changeTodoInput(val) {
  return {
    type: ACTION_CHANGE_TODO_INPUT,
    payload: val
  }
}

export function addTodoItem(item) {
  return {
    type: ACTION_ADD_TODO_ITEM,
    payload: item
  }
}

export function deleteTodoItem(idx) {
  return {
    type: ACTION_DELETE_TODO_ITEM,
    payload: idx
  }
}

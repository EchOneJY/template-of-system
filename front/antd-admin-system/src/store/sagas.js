import { takeEvery, put, select } from 'redux-saga/effects'
import {
  ACTION_ADD_TODO_ITEM_SAGA,
  ACTION_DELETE_TODO_ITEM_SAGA,
  setInputValue,
  setTodoList
} from './actions'
import { message } from 'antd'

function* addTodoItem() {
  const {
    todos: { inputValue, todoList }
  } = yield select()
  if (inputValue === '') {
    message.warning('内容不能为空')
    return
  }
  const list = todoList.concat(inputValue)
  yield put(setTodoList(list))
  yield put(setInputValue(''))
}

function* deleteTodoItem(action) {
  const { payload } = action
  const {
    todos: { todoList }
  } = yield select()
  const list = todoList.slice()
  list.splice(payload, 1)
  yield put(setTodoList(list))
}

//generator函数
function* rootSagas() {
  //等待捕获action
  yield takeEvery(ACTION_ADD_TODO_ITEM_SAGA, addTodoItem)
  yield takeEvery(ACTION_DELETE_TODO_ITEM_SAGA, deleteTodoItem)
}

export default rootSagas

import { takeEvery, put } from 'redux-saga/effects'
import { INIT_LIST_ACTION } from './actionTypes'
import { initListAction } from './actionCreators'
import { queryTodoList } from '@/api'

function* initList() {
  const response = yield queryTodoList()
  const action = initListAction(response.data.data)
  yield put(action)
}

//generator函数
function* rootSagas() {
  //等待捕获action
  yield takeEvery(INIT_LIST_ACTION, initList)
}

export default rootSagas

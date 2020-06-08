import { takeEvery, put } from 'redux-saga/effects'
import { INIT_LIST_ACTION_SAGA } from './actionTypes'
import { initListAction } from './actionCreators'
import { queryTodoList } from '@/api'

function* initList() {
  const data = {
    type: '03'
  }
  const response = yield queryTodoList(data)
  const action = initListAction(response.data.data)
  yield put(action)
}

//generator函数
function* rootSagas() {
  //等待捕获action
  yield takeEvery(INIT_LIST_ACTION_SAGA, initList)
}

export default rootSagas

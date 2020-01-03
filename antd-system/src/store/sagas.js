import { takeEvery, put } from 'redux-saga/effects'
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction
} from './actionCreators'
//import axios from 'axios'

//generator函数
function* rootSagas() {
  //等待捕获action
  yield takeEvery(CHANGE_INPUT, changeInputAction)
  yield takeEvery(ADD_ITEM, addItem)
  yield takeEvery(DELETE_ITEM, deleteItemAction)
}

function* addItem() {
  console.log(1)
  // yield put(addItemAction())
}

export default rootSagas

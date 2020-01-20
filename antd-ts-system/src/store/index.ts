import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { UserState } from './reducers/user'
import { MenuState } from './reducers/menu'
import createSagaMiddleware from 'redux-saga'
// import mySaga from './sagas'

export interface StoreState {
  menu: MenuState
  user: UserState
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware)   
  )
)
// sagaMiddleware.run(mySaga)

export default store
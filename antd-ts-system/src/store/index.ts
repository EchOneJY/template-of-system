import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
sagaMiddleware.run(mySaga)

export default store
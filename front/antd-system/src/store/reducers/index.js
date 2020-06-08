import { combineReducers } from 'redux'
import todos from './todos'
import siderMenu from './siderMenu'
import headerType from './headerType'

export default combineReducers({
  todos,
  siderMenu,
  headerType
})
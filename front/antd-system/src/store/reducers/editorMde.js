import { TOGGLE_TEXT_VAL, TOGGLE_SELECT_TAB } from '../actionTypes'

const defaultState = {
  textValue: '',
  selectedTab: 'write'
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_TEXT_VAL:
      let newState = JSON.parse(JSON.stringify(state))
      newState.textValue = action.value
      return newState
    case TOGGLE_SELECT_TAB:
      let newState = JSON.parse(JSON.stringify(state))
      newState.selectedTab = action.value
      return newState
    default:
      return state
  }
}

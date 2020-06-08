import { TOGGLE_SIDER_MENU } from '../actionTypes'

export default (state=[],action) => {
    switch(action.type){
        case TOGGLE_SIDER_MENU: 
            return action.list
        default:
            return state
    }
}
import { TOGGLE_HEADER_TYPE } from '../actionTypes'

export default (state='home',action) => {
    switch(action.type){
        case TOGGLE_HEADER_TYPE: 
            return action.headerType
        default:
            return state
    }
}
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from '../actionTypes'

const defaultState = {
    inputValue : 'Write Something',
    list:[
        '早上4点起床，锻炼身体',
        '中午下班游泳一小时'
    ]
}
export default (state = defaultState,action) => {
    if(action.type === CHANGE_INPUT) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if(action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }
    if(action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.idx,1)
        return newState
    }
    return state
}
export interface MenuState {
  type: string;
  list: any[]
}

const initialState:MenuState = {
  type: 'home',
  list: []
}

export default (state=initialState,action:any) => {
    switch(action.type){
        case 'toggleHeaderType': 
            return {...state, type: action.headerType}
        case 'toggleSiderMenu': 
            return {...state, list: action.list}
        default:
            return state
    }
}
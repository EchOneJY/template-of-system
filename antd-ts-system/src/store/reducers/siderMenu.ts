interface IACTION {
  type: string,
  list: []
}

export default (state=[],action:IACTION) => {
    switch(action.type){
        case 'toggleSiderMenu': 
            return action.list
        default:
            return state
    }
}
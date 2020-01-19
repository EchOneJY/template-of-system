interface IACTION {
  type: string
  headerType: string
}

export default (state='home',action:IACTION) => {
    switch(action.type){
        case 'toggleHeaderType': 
            return action.headerType
        default:
            return state
    }
}
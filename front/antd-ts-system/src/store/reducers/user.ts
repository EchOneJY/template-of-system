export interface UserState {
  uuid: string
  username: string
  token: string
}

const initialState:UserState = {
  uuid: '',
  username: '',
  token: ''
}

export default (state=initialState,action:any) => {
    switch(action.type){
        case 'setUserInfo': 
            return action.user
        default:
            return state
    }
}
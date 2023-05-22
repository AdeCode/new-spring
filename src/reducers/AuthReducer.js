export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            localStorage.setItem('isAuthenticated',true)
            localStorage.setItem('token',JSON.stringify(action.payload.token))
            return {
                ...state,
                token:action.payload.token,
                isAuthenticated:true,
                user:action.payload.user
            }

        case 'LOGOUT':
            localStorage.setItem('isAuthenticated',false)
            localStorage.setItem('user',null)
            localStorage.setItem('token','')
            //localStorage.clear()
            return {
                ...state,
                isAuthenticated:false,
                token:'',
                user:null
            }

        default:
            return state
    }
}
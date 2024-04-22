export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            localStorage.setItem('isAuthenticated',true)
            localStorage.setItem('token',JSON.stringify(action.payload.token))
            localStorage.setItem('profile',JSON.stringify(action.payload.profile))
            return {
                ...state,
                token:action.payload.token,
                isAuthenticated:true,
                user:action.payload.user,
                profile:action.payload.profile
            }

        case 'LOGOUT':
            localStorage.setItem('isAuthenticated',false)
            localStorage.setItem('user',null)
            localStorage.setItem('token','')
            return {
                ...state,
                isAuthenticated:false,
                token:'',
                user:null,
                profile:null,
            }

        default:
            return state
    }
}
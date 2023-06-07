export const authReducer = (state, action) => {
    switch(action.type){
        case 'SETPROFILE':
            localStorage.setItem('profile',JSON.stringify(action.payload.profile))
            return {
                ...state,
                profile:action.payload.profile
            }

        case 'GETPROFILE':
            localStorage.setItem('isAuthenticated',false)
            localStorage.setItem('user',null)
            localStorage.setItem('token','')
            //localStorage.clear()
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
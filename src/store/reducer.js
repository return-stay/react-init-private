import { AUTH_CHANGE, PERMISSION_CHANGE,CURRENT_CHANGE, HEADER_CHANGE } from './actionTypes'
import { handleActions } from 'redux-actions'
import UserHome from '../pages/User/Home'
const defaultState = {
    authed: false,
    permissionList:[
        {
            path: '/user/home',
            pathName:'home',
            name:'首页',
            component:UserHome,
            icon:'pie-chart'
        }
    ],
    currentList:[],
    avatar:'',
    name:''
};

export const statusReducer = handleActions(
    {
        [AUTH_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.authed = action.payload.authStatus
            if(newState.authed !== null){
                localStorage.setItem('authed',newState.authed)
            }else{
                newState.permissionList = [
                    {
                        path: '/user/home',
                        pathName:'home',
                        name:'首页',
                        component:UserHome,
                        icon:'pie-chart'
                    }
                ]
                localStorage.removeItem('authed')
            }
            
            return newState;
        },
        [PERMISSION_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.permissionList = action.payload.permissionList
            newState.currentList = action.payload.currentList
            newState.avatar = action.payload.avatar
            newState.name = action.payload.name
            return newState;
        },
        [CURRENT_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.currentList = action.payload.currentList
            return newState;
        },
        [HEADER_CHANGE]: (state, action) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.headerObj = action.payload.headerObj
            return newState
        }

    },defaultState)

export default statusReducer

// export default (state = defaultState, action) => {
//     if(action.type === AUTH_CHANGE){
//         const newState = JSON.parse(JSON.stringify(state))
//         newState.authed = action.authStatus
//         return newState;
//     }

//     return state;
// };

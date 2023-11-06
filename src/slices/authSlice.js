import {createSlice} from '@reduxjs/toolkit';




const initialState = {
    authenticated:false,
    user:{},
    token:""
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{ 
            state.user = action.payload.user;
            state.authenticated = true;
            
        },
        logout:(state,action)=>{
            state.user = {};
            state.authenticated=false;
        }
    }
})

export const {setCredentials,logout} = authSlice.actions;
export default authSlice.reducer;
import { configureStore, createSlice, current } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

let user = createSlice({
    name: 'user',
    initialState: 'kim',
    reducers: {
        setUser(state){
            return ('Jhon'+state)
        }
    }

})
export let {setUser} = user.actions

let stock = createSlice({
    name:'stock',
    initialState:[10,11,12]

})
let cart = createSlice({
    name: 'cart',
    initialState: [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ],
        reducers: {
            setCart(state, action){
                let i;
                for(i=0; i<state.length; i++) {
                    if(state[i].id == action.payload.id) {
                        state[i].count += 1;
                        break;
                    }
                }
                state.push(action.payload);
            },
            setCountPlus(state,action){
                
                let i;
                for(i=0; i<state.length; i++) {
                    if(state[i].id == action.payload) {
                        break;
                    }
                }
                state[i].count+=1;
            },
            setCountMinus(state, action) {
                // let i = state.find((x)=>{x.id == action.payload})
                let i;
                for(i=0; i<state.length; i++) {
                    if(state[i].id == action.payload) {
                        break;
                    }
                }

                if(state[i].count != 1){
                    state[i].count -= 1;
                }
            }
      }
})
export let {setCountPlus, setCart, setCountMinus} = cart.actions;

export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer
  }
}) 
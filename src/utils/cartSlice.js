import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:'cart', //It takes first configuration as name
    initialState:{ //It takes second configurations as initialState
        items:[] //cart items, initially it is an empty array
    },
    reducers:{ //Types of actions that you want to perform are defined here
        addItem:(state, action)=>{
            //directly mutating the state over here
            state.items.push(action.payload);
       },
       removeItem:(state, action)=>{
        state.items.pop();
       },
       clearCart:(state)=>{
        state.items.length=0;
       }
    }
})

export const {addItem, removeItem, clearCart}=cartSlice.actions;

export default cartSlice.reducer;


// In the context of Redux, reducers are functions responsible for handling actions and updating the state based on those actions. Reducers are associated with slices of the state, and they specify how the state should change in response to different actions.

// When you create a slice of the Redux state, you typically define a reducer function to handle that slice. The reducer function takes the current state and an action as parameters, and it returns the new state based on the action's type
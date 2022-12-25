import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        //GET ALL
        getProductsStart:(state)=>{
            state.isFetching = true;
            state.error=false;
        },
        getProductsSuccess:(state, action)=>{
            state.isFetching = false;
            state.error=false;
            state.products = action.payload;
        },
        getProductsFailed:(state)=>{
            state.isFetching=false;
            state.error=true;
        }
    }
})

export const {getProductsStart,getProductsSuccess,getProductsFailed} = productSlice.actions;
export default productSlice.reducer;


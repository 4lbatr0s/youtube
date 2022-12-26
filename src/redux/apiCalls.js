import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "./requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductsFailed, deleteProductsStart, deleteProductsSuccess, getProductsFailed, getProductsStart, getProductsSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";

//INFO: HOW TO CREATE AN API CALL FOR REDUX!
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const response = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(response.data)); //TIP: If it's successfull then send response.data
     } catch (error) {
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const response = await publicRequest.get("/products");
        dispatch(getProductsSuccess(response.data)); //TIP: If it's successfull then send response.data
     } catch (error) {
        dispatch(getProductsFailed())
    }
}


export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductsStart());
    try {
        // const response = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductsSuccess(id)); //TIP: If it's successfull then send response.data
     } catch (error) {
        dispatch(deleteProductsFailed())
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
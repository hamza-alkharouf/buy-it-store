import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/categoryConstants";
  import axios from "axios";

  // Get All Category (admin)
  export const getAllCategories = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORY_REQUEST });

      const { data } = await axios.get("/api/v1/admin/categories");
  

      dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data });

    } catch (error) {
      dispatch({
        type: ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Category Details
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/category/${id}`);


    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};



// Create Category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/category/new`,
      categoryData,
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Update Category
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(categoryData)
    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

    // Clearing Errors
    export const clearErrorsCategory = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };
      
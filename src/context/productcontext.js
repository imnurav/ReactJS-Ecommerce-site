import axios from "axios";
import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import reducer from '../reducer/Reducer'
// create a context
const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState={
    isLoading:false,
    isError:false,
    products:[],
    featureProducts:[],
    isSingleLoading:false,
    singleProduct:{},

}
// provider
const AppProvider = ({ children }) => {

    const [state,dispatch]=useReducer(reducer,initialState);

    const getProducts=async(url)=>{
        dispatch({type:'SET_LOADING'})
        try {
            const res=await axios.get(url)
            // console.log("Response is : ",res);
            const products=await res.data;
            // console.log(products);
            dispatch({type:"SET_API_DATA",   payload:products})
        } catch (error) {
            dispatch({type:"API_ERROR"})
        }
    }


    // Specific product data

    const getSingleProduct=async (url)=>{
      dispatch({type:'SET_SINGLE_LOADING'})
      try {
        const res=await axios.get(url)
            // console.log("Response is : ",res);
            const singleProduct=await res.data;
            // console.log(products);
            dispatch({type:"SET_SINGLE_PRODUCT",   payload:singleProduct})
      } catch (error) {
        dispatch({type:"SET_SINGLE_ERROR"})
      }
    }
  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state,getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useProductContext };
// consumer useContext Hook

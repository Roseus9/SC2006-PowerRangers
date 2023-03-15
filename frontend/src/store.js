// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productItemReducer } from './reducers/productReducer'
// import thunk from 'redux-thunk'
// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// const initialState = {}
// const middleware = [thunk]
// const reducer = combineReducers({
//   productList: productListReducer,
// })

// const store = createStore(reducer, initialState,
//     composeWithDevTools(applyMiddleware(...middleware)))

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productItem: productItemReducer,
  },
})


export default store
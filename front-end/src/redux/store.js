/*
    Don't add anything to this file, this file use for create a store from the root reducer
    Root reducer file is Index.js file of Reducers folder
*/




import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);

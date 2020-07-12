import {createStore} from "redux";
import reducer from "./reducers/rootreducer";

const store = createStore(reducer);

export default store;
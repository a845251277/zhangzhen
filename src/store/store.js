import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"
let reader =function(state=[],action){
    switch(action.type){
        case "XX":
        // state=action.data;
        state.push(action.data)
        return state;
        case "ZZ":
        state=action.data;
        return state;
        default:
        return state;
    }
}
let reader2 =function(state=0,action){
    switch(action.type){
        case "DD":
        state=action.list;
        return state;
        default:
        return state;
    }
}
let reducers=combineReducers({reader,reader2})
let store=createStore(reducers,applyMiddleware(thunk))
export default store
import { createStore, combineReducers } from "redux";
import { dashboardReducer } from './../reducers/dashboardReducer';

export default () => {
    const store = createStore(
        combineReducers({
            dashboard: dashboardReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};
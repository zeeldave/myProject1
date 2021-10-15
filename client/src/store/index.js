import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


const ReduxStore = () =>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        appReducers,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

export default ReduxStore;
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["users"],
    //stateReconciler: hardSet,
    stateReconciler: autoMergeLevel2,
  };
  
  const persistedReducer = persistReducer(persistConfig, appReducers);
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  const persistor = persistStore(store);
  
  export { store, persistor };
  
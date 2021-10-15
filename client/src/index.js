import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import 'resources/styles/styles.css';

import { Provider } from 'react-redux';
import {store, persistor} from "./store";
import  { PersistGate } from 'redux-persist/integration/react';
import Loader from './utils/loader';


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <PersistGate loading={<Loader full={true}/>} persistor={persistor}>
    <Routes />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

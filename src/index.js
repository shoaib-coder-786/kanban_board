import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {Store,persistor} from './Utilities/Redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store} >
    <PersistGate loading={null} persistor={persistor}>
    <App />

    </PersistGate>
  </Provider>
);


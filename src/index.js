import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react' //INFO: you should install redux-persist library!

ReactDOM.render(
  <Provider store={store}> {/*INFO: How to use Redux in the project*/}
    <PersistGate loading="null" persistor={persistor}> {/*INFO: persist should become after Provider */}
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

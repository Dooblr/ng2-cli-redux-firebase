import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import {AuthState, authReducer} from "./reducers/auth.reducer";
import {dataReducer, DataState} from "./reducers/data.reducer";
import {uiReducer, uiState} from "./reducers/ui.reducer";
declare var require:any

export class IAppState {
  auth?: AuthState
  data?: DataState
  ui?: uiState
}

export const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  data: dataReducer,
  ui: uiReducer,
});

export const enhancers = [
  // persistState('counter', { key: 'ng2-redux/examples/counter' })
];


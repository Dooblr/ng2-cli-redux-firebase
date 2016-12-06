import { AuthActions } from '../actions/auth.actions';
declare var firebase:any
declare var Object:any

// define state
export interface AuthState {
  isLoggedIn: boolean
  hasBeenRegistered: boolean
}
// initialize it
const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  hasBeenRegistered: false
}

export function authReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {

    case AuthActions.SET_USER_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: true
      })

    case AuthActions.SET_USER_LOGGED_OUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      })

    case AuthActions.USER_WAS_REGISTERED:
      return Object.assign({}, state, {
        hasBeenRegistered: true
      })

    case AuthActions.REGISTER_ERROR:
      return Object.assign({}, state, {
        hasBeenRegistered: true
      })

    default:
      return state;
  }
}

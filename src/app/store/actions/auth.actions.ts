import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../index'
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {Router} from "@angular/router";
declare var firebase:any

@Injectable()
export class AuthActions {

  static SET_USER_LOGGED_IN: string = 'SET_USER_LOGGED_IN'
  static SET_USER_LOGGED_OUT: string = 'SET_USER_LOGGED_OUT'
  static USER_WAS_REGISTERED: string = 'USER_WAS_REGISTERED'
  static REGISTER_ERROR: string = 'REGISTER_ERROR'

  constructor (
    private redux: NgRedux<IAppState>,
    public toastr: ToastsManager,
    private router:Router) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {this.setUserLoggedIn()}
    });
  }

  setUserLoggedIn(){
    this.redux.dispatch({type: AuthActions.SET_USER_LOGGED_IN,})
  }

  login(email,password): void {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        this.redux.dispatch({type: AuthActions.SET_USER_LOGGED_IN});
        this.router.navigate(['/directory']);
      })
      .catch((error) => {
        alert(error.message)
        this.redux.dispatch({type: AuthActions.SET_USER_LOGGED_OUT});
      })

  }

  logout(): void {
    firebase.auth().signOut().then(() => {
      this.redux.dispatch({ type: AuthActions.SET_USER_LOGGED_OUT })
      this.toastr.success('You have been logged out.')
    }, (error) => {
      this.toastr.error('There was a problem logging out. Please try again.')
      console.log(error)
    })
  }

  register(email,password): void {
    firebase.auth()
      .createUserWithEmailAndPassword(email,password)
      .catch((error) => {
        alert(error.message)
        this.redux.dispatch({ type: AuthActions.REGISTER_ERROR });
        return
      })
    this.redux.dispatch({ type: AuthActions.USER_WAS_REGISTERED });
  }
}

import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../index'
declare var firebase:any
// ui method namespace: component_UImethod()
// ui namespace: COMPONENT_UIACTION

@Injectable()
export class uiActions {

  static DIRECTORY_TOGGLE_EDIT_AT_KEY: string = 'DIRECTORY_TOGGLE_EDIT_AT_KEY'
  static DIRECTORY_TOGGLE_ADD_ORDER_MODAL: string = 'DIRECTORY_TOGGLE_ADD_ORDER_MODAL'

  static OPTIONS_TOGGLE_UPDATED_LABEL: string = 'OPTIONS_SHOW_UPDATED_LABEL'
  static OPTIONS_TOGGLE_UPDATED_ERROR_LABEL: string = 'OPTIONS_SHOW_UPDATED_ERROR_LABEL'

  constructor (private redux: NgRedux<IAppState>) {}

  //====================================
  // Directory
  //====================================

  directory_toggleEditAtKey(key){
    this.redux.dispatch({
      type: uiActions.DIRECTORY_TOGGLE_EDIT_AT_KEY,
      payload: {key:key}
    })
  }
  directory_toggleAddOrderModal(){
    this.redux.dispatch({type: uiActions.DIRECTORY_TOGGLE_ADD_ORDER_MODAL})
  }

  //====================================
  // Options
  //====================================

  options_toggleUpdatedLabel(){
    this.redux.dispatch({type: uiActions.OPTIONS_TOGGLE_UPDATED_LABEL})
  }

  options_toggleUpdatedErrorLabel(){
    this.redux.dispatch({type: uiActions.OPTIONS_TOGGLE_UPDATED_ERROR_LABEL})
  }
}

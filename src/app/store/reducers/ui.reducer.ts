import {uiActions} from "../actions/ui.actions";
var dotProp = require('dot-prop-immutable');

export interface uiState {
  directory: {
    toggleAddOrderModal:boolean
    showEditArray:{}
  },
  options:{
    showUpdatedLabel:boolean
    showUpdatedErrorLabel:boolean
  }
}

const INITIAL_STATE: uiState = {
  directory: {
    toggleAddOrderModal:false,
    showEditArray:{}
  },
  options:{
    showUpdatedLabel:false,
    showUpdatedErrorLabel:false
  }
}

export function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    // Directory

    case uiActions.DIRECTORY_TOGGLE_EDIT_AT_KEY:
      var key = action.payload.key
      state = dotProp.set(
        //what it was
        state, `directory.showEditArray.${key}`,
        //what it will be
        !state.directory.showEditArray[key])
      return state

    case uiActions.DIRECTORY_TOGGLE_ADD_ORDER_MODAL:
      state = dotProp.set(
        state, `directory.toggleAddOrderModal`, !state.directory.toggleAddOrderModal)
      return state


    // Options

    case uiActions.OPTIONS_TOGGLE_UPDATED_LABEL:
      state = dotProp.set(
        state, `options.showUpdatedLabel`, !state.options.showUpdatedLabel)
      return state



    // Fallthrough

    default:
      return state;
  }
}

import { DataActions } from '../actions/data.actions';
var dotProp = require('dot-prop-immutable');
declare var firebase:any
declare var Object:any

// define state
export interface DataState {
  orders: any[];
  itemTypes: any[];
  maxQuantity: number;
}
// initialize it
const INITIAL_STATE: DataState = {
  orders: [],
  itemTypes: [],
  maxQuantity: 5
}

export function dataReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {

    //ORDERS
    case DataActions.ADD_ORDER:
      return Object.assign({}, state, {
        orders: [...state.orders,
          {
            key: action.payload.key,
            name:action.payload.name,
            items:action.payload.items
          }]
      })

    case DataActions.REMOVE_ORDER:
      var keepOrders = []
      for(var i = 0; i < state.orders.length; ++i) {
        if(state.orders[i]['key'] !== action.payload.key) {
          keepOrders.push(state.orders[i])
        }
      }
      return Object.assign({}, state, {
        orders: keepOrders
      })

    case DataActions.UPDATE_ORDER:
      for(var i = 0; i < state.orders.length; ++i) {
        if(state.orders[i]['key'] === action.payload.key) {
          state = dotProp.set(state, `orders.${i}.name`, action.payload.name)
          state = dotProp.set(state, `orders.${i}.items`, action.payload.items)
        }
      }
      return state

    //ITEMTYPES
    case DataActions.ADD_ITEM_TYPE:
      return Object.assign({}, state, {
        itemTypes: [...state.itemTypes,
          {
            key: action.payload.key,
            text:action.payload.text
          }]
      })

    case DataActions.UPDATE_ITEM_TYPES:
      state = dotProp.set(state, `itemTypes`, action.payload.itemTypes)
      return state

    default:
      return state;
  }
}

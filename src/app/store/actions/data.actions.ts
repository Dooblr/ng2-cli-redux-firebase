import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../index'
import {DataService} from "../../services/data.service";
import {uiActions} from "./ui.actions";
declare var firebase:any

@Injectable()
export class DataActions {

  static FB_ORDERS_REF:string = 'data/orders/'
  static FB_ITEMTYPES_REF:string = 'data/itemTypes/'

  //============================================
  // Action Types
  //============================================

  static ADD_ORDER: string = 'ADD_ORDER'
  static REMOVE_ORDER: string = 'REMOVE_ORDER'
  static UPDATE_ORDER: string = 'UPDATE_ORDER'

  static ADD_ITEM_TYPE: string = 'ADD_ITEM_TYPE'
  static UPDATE_ITEM_TYPES: string = 'UPDATE_ITEM_TYPES'

  //============================================
  // Lifecycle
  //============================================

  constructor (
    private uiActions:uiActions,
    private redux: NgRedux<IAppState>,
    private DataService:DataService) {}

  //============================================
  // Backend Actions
  //============================================

  // Orders

  postOrderToFirebase(name, items): void {
    firebase.database().ref(DataActions.FB_ORDERS_REF).push(
      {
        name: name,
        items: items
      })
  }
  removeFromFirebase(key): void {
    firebase.database().ref(DataActions.FB_ORDERS_REF + key).remove()
  }
  updateToFirebase(key,form){
    // get current orders state
    const {data} = this.redux.getState()
    var orders = data.orders
    var formSize = this.DataService.size(form.value)
    var ordersSize = this.DataService.size(orders)
    // parse through form and retain unfilled values, check for XSS
    for(var i=0; i< formSize; ++i){
      // TODO: XSS protection
      if(form.value.name.includes('<script>')){
        alert('Your IP address has been logged as malicious.')
        return
      }
      if(form.value.name == ""){
        for(var a=0; a< ordersSize; ++a){
          if (orders[a].key == key){
            // set form value to
            form.value.name = orders[a].name
          }
        }
      }
      for(var v=0; v< form.value.items.length; ++v){
        if(form.value.items[v].text == ""){
          for(var a=0; a< ordersSize; ++a){
            if (orders[a].key == key){
              // set form value to
              form.value.items[v].text = orders[a].items[v].text
            }
          }
        }
        if(form.value.items[v].quantity == ""){
          for(var b=0; b< ordersSize; ++b){
            if (orders[b].key == key){
              // set form value to
              form.value.items[v].quantity = orders[b].items[v].quantity
            }
          }
        }
      }
    }
    // push to db
    firebase.database().ref(DataActions.FB_ORDERS_REF + key)
      .set({name:form.value.name, items:form.value.items})
    // close edit window
    this.uiActions.directory_toggleEditAtKey(key)
  }

  // Item Types

  postItemTypesToFb(form){
    var fbItemsArray = []
    // Todo: clean up this filter
    for(var i=0; i<form.value.itemTypes.length; ++i){
      if(/\S/.test(form.value.itemTypes[i].text)){
        fbItemsArray.push(form.value.itemTypes[i].text)
      }
    }

    firebase.database().ref('data/itemTypes').set(fbItemsArray)
      .then(() => {
        this.uiActions.options_toggleUpdatedLabel()
      })
      .catch((error) => {
        this.uiActions.options_toggleUpdatedErrorLabel()
        console.log(error)
      })

  }

  //============================================
  // Frontend
  //============================================

  // Order objects
  addOrder(key, name, items): void {
    this.redux.dispatch({
      type: DataActions.ADD_ORDER,
      payload: {
        key:key,
        name: name,
        items: items}
    })
  }

  removeOrder(key): void {
    this.redux.dispatch({
      type: DataActions.REMOVE_ORDER,
      payload: {key:key}
    })
  }

  updateOrder(key, name, items): void {
    this.redux.dispatch({
      type: DataActions.UPDATE_ORDER,
      payload: {
        key:key,
        name: name,
        items: items}
    })
  }

  // Item types array
  setItemtypes(itemTypes): void {
    this.redux.dispatch({
      type: DataActions.UPDATE_ITEM_TYPES,
      payload: {itemTypes:itemTypes}
    })
  }




}

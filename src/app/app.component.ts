import {Component, style, animate, transition, state, trigger, ViewContainerRef} from '@angular/core';
import {NgRedux, DevToolsExtension, select} from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from './store/index';
import {AuthGuard} from "./services/auth-guard.service";
import {Observable} from "rxjs/Rx";
import {AuthActions} from "./store/actions/auth.actions";
import {DataActions} from "./store/actions/data.actions";
import {ToastsManager} from "ng2-toastr/ng2-toastr";

const createLogger = require('redux-logger');
declare var firebase:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthGuard],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({opacity: '0'}))
      ])
    ])
  ]
})
export class AppComponent {

  @select([ 'auth', 'isLoggedIn' ]) isLoggedIn$: Observable<boolean>
  isLoggedIn: boolean
  tellUserAuthText: boolean

  ngOnInit() {
    this.isLoggedIn$
      .skip(1)
      .subscribe((value: any) => {
        this.isLoggedIn = value
        if(this.isLoggedIn){
          this.toastr.success('You are logged in.')
        } else {
          // this.toastr.warning('You are logged out.')
        }
      });
  }

  constructor(
    public toastr: ToastsManager, vRef: ViewContainerRef,
    private redux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private AuthActions: AuthActions,
    private DataActions:DataActions) {

    this.toastr.setRootViewContainerRef(vRef);
    this.startfbWatchers()
    this.redux.configureStore(
      rootReducer,
      <IAppState>{},
      [  ], //createLogger()
      [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);


  }

  //============================================
  // Watchers
  //============================================

  // watchers initialized with root
  startfbWatchers(){
    var FB_ORDERS_REF = 'data/orders/'
    var FB_ITEMTYPES_REF = 'data/itemTypes/'

    // ORDERS
    firebase.database().ref(FB_ORDERS_REF)
      .on('child_added',(snapshot)=>{
        this.DataActions.addOrder(
          snapshot.key,
          snapshot.val().name,
          snapshot.val().items)
      })
    firebase.database().ref(FB_ORDERS_REF)
      .on('child_removed',(snapshot)=>{
        this.DataActions.removeOrder(snapshot.key)
      })
    firebase.database().ref(FB_ORDERS_REF)
      .on('child_changed',(snapshot)=>{
        this.DataActions.updateOrder(
          snapshot.key,
          snapshot.val().name,
          snapshot.val().items)
      })

    // ITEM_TYPES
    firebase.database().ref(FB_ITEMTYPES_REF)
      .on('value',(snapshot)=>{
        this.DataActions.setItemtypes(snapshot.val())
      })
  }

  checkIfButtonDisabled(){
    if(!this.isLoggedIn){
      this.toastr.warning('Please log in to continue.')
    }
  }

}

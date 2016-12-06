import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms"
import {select, NgRedux} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {DataActions} from "../../store/actions/data.actions";
import {DataService} from "../../services/data.service";
import {uiActions} from "../../store/actions/ui.actions";
declare var firebase:any

@Component({
  selector: 'directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [DataActions,DataService,uiActions]
})

export class DirectoryComponent implements OnInit {

  public editForm: FormGroup;

  @select([ 'data', 'orders' ]) orders$: Observable<any[]>
  @select([ 'data', 'itemTypes' ]) itemTypes$: Observable<string[]>
  @select([ 'ui', 'directory', 'showEditArray' ]) showEditArray$: Observable<{}>
  @select([ 'ui', 'directory', 'toggleAddOrderModal' ]) toggleAddOrderModal$: Observable<boolean>

  ngOnInit(){
    // init edit form
    this.editForm = this._fb.group({
      name: ['', Validators.required],
      items: this._fb.array([])
    });

    //TODO: reduxify the state of the add-new modal when ng-bootstrap becomes stable
    //noinspection TypeScriptUnresolvedFunction
    this.toggleAddOrderModal$
      .skip(1)
      .subscribe((value: any) => this.closeAddOrderModal())
  }

  constructor(
    private redux:NgRedux<any>,
    private _fb: FormBuilder,
    private uiActions:uiActions,
    private DataActions: DataActions,
    private DataService: DataService) {}

  //TODO:componentize and reduxify modular item entry form
  initItem() {
    return this._fb.group(
      {
        text: ['', Validators.required],
        quantity: ['', Validators.required]
      });
  }
  removeItem(i: number) {
    const itemControls = <FormArray>this.editForm.controls['items'];
    itemControls.removeAt(i);
  }
  addItem() {
    const itemControls = <FormArray>this.editForm.controls['items'];
    itemControls.push(this.initItem());
  }

  closeAddOrderModal(){
    document.getElementById('close-modal-button').click()
  }

  toggleEditMode(order){

    this.uiActions.directory_toggleEditAtKey(order.key)

    //TODO:reduxify form state
    var itemsCount = this.DataService.size(order.items)
    var itemsArray = []
    for (var i=0; i < itemsCount; ++i){itemsArray.push(this.initItem())}
    this.editForm = this._fb.group({
      name: ['', Validators.required],
      items: this._fb.array(itemsArray)
    });
  }

}

import {Component, OnInit, ChangeDetectorRef, style, state, animate, transition, trigger} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormArray, ReactiveFormsModule} from "@angular/forms";
import {DataActions} from "../../store/actions/data.actions";
import {select, NgRedux} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var firebase:any

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
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
export class OptionsComponent implements OnInit {

  public itemTypeForm: FormGroup

  @select([ 'data', 'itemTypes' ]) itemTypes$: Observable<string[]>
  @select([ 'ui', 'options', 'showUpdatedLabel' ]) showUpdatedLabel$: Observable<any>
  @select([ 'ui', 'options', 'showUpdatedErrorLabel' ]) showUpdatedErrorLabel$: Observable<boolean>

  ngOnInit() {
    // initialize form
    this.itemTypeForm = this._fb.group(
      {itemTypes: this._fb.array( [this.initItem("")] )})
    this.itemTypes$
      .subscribe((value: any) => this.initItemTypeForm(value))
    //noinspection TypeScriptUnresolvedFunction
    this.showUpdatedLabel$
      .skip(1)
      .subscribe((value: any) => this.toastr.success('Item types have been updated.'))
    //noinspection TypeScriptUnresolvedFunction
    this.showUpdatedErrorLabel$
      .skip(1)
      .subscribe((value: any) => this.toastr.success('There was an error updating items.'))
  }

  constructor(
    public toastr: ToastsManager,
    private redux:NgRedux<any>,
    private DataActions:DataActions,
    private _fb: FormBuilder,
    private ref:ChangeDetectorRef) {}

  initItemTypeForm(itemTypes){
    var itemTypesFormArray = []
    for(var i=0;i< itemTypes.length; ++i){
      itemTypesFormArray.push(this.initItem(itemTypes[i]))
    }
    this.itemTypeForm = this._fb.group({
      itemTypes: this._fb.array(itemTypesFormArray)
    });
  }

  initItem(string) {
    return this._fb.group({text: [string, Validators.required]});
  }
  removeItem(i: number) {
    const itemControls = <FormArray>this.itemTypeForm.controls['itemTypes'];
    itemControls.removeAt(i);
  }
  addItem(string) {
    const itemControls = <FormArray>this.itemTypeForm.controls['itemTypes'];
    if (string == null){
      string = ""
    }
    itemControls.push(this.initItem(string));
  }

}

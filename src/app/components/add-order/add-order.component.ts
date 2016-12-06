import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {DataActions} from "../../store/actions/data.actions";
import {NgRedux, select} from "ng2-redux/lib/index";
import {uiActions} from "../../store/actions/ui.actions";
import {DataService} from "../../services/data.service";
import {Observable} from "rxjs/Rx";

declare var firebase:any

@Component({
  selector: 'add-order',
  templateUrl: 'add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {

  public myForm: FormGroup;

  @select([ 'data', 'itemTypes' ]) itemTypes$: Observable<any[]>

  constructor(
    private redux: NgRedux<any>,
    private DataActions:DataActions,
    private DataService:DataService,
    private uiActions:uiActions,
    private ref:ChangeDetectorRef,
    private _fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [null, Validators.required],
      items: this._fb.array([
        this.initItem(),
      ])
    });
  }

  initItem() {
    return this._fb.group({
      text: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  addItem() {
    const itemControls = <FormArray>this.myForm.controls['items'];
    itemControls.push(this.initItem());
  }

  removeItem(i: number) {
    const itemControls = <FormArray>this.myForm.controls['items'];
    itemControls.removeAt(i);
  }
}

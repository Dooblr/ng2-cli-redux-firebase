import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AddOrderComponent} from "./add-order.component";

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AddOrderComponent ],
  bootstrap:    [ ]
})

export class AddOrderModule { }

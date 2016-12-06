import {DirectoryComponent} from "./directory.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AddOrderComponent} from "../add-order/add-order.component";
import {AddOrderModule} from "../add-order/add-order.module";
import {FilterPipe} from "../../pipes/filter.pipe";

@NgModule({
  declarations: [
    DirectoryComponent,
    AddOrderComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class DirectoryModule { }

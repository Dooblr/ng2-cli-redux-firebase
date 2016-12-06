import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {OptionsComponent} from "./options.component";
import {DataActions} from "../../store/actions/data.actions";
import {DataService} from "../../services/data.service";

@NgModule({
  declarations: [OptionsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [DataActions,DataService],
  bootstrap: []
})
export class OptionsModule { }

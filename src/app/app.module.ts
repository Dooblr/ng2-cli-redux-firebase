import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { CommonModule } from "@angular/common"
import { NgReduxModule, NgRedux, DevToolsExtension } from "ng2-redux/lib/index"
import { LoginComponent } from './components/login/login.component'
import { AuthGuard } from "./services/auth-guard.service"
import { AppRoutingModule } from "./app-routing.module"
import { DirectoryModule } from "./components/directory/directory.module"
import { AuthActions } from "./store/actions/auth.actions"
import { uiActions } from "./store/actions/ui.actions"
import { OptionsModule } from "./components/options/options.module";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";

let options: ToastOptions = new ToastOptions({
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "2000",
  timeOut: "1000",
  extendedTimeOut: "0",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    NgReduxModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DirectoryModule,
    OptionsModule,
    ToastModule.forRoot(options),
  ],
  providers: [
    NgRedux,
    DevToolsExtension,
    AuthGuard,
    AuthActions,
    uiActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

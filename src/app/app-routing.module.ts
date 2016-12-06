import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DirectoryComponent} from "./components/directory/directory.component";
import {AuthGuard} from "./services/auth-guard.service";
import {OptionsComponent} from "./components/options/options.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'directory',
        component: DirectoryComponent,
        canActivate:[AuthGuard],
      },
      {
        path: 'options',
        component: OptionsComponent,
        canActivate:[AuthGuard],
      },
      { path: '**', component: LoginComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

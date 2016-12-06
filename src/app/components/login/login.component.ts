import {Component, ChangeDetectorRef} from '@angular/core'
import {select, NgRedux} from "ng2-redux/lib/index"
import {Observable} from "rxjs/Rx"
import {AuthActions} from "../../store/actions/auth.actions"
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [AuthActions]
})
export class LoginComponent {

  @select([ 'auth', 'isLoggedIn' ]) isLoggedIn$: Observable<boolean>

  public loginForm: FormGroup;

  ngOnInit(){
    // init edit form
    this.loginForm = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  constructor(
    public AuthActions: AuthActions,
    private redux: NgRedux<any>,
    private _fb:FormBuilder) {}

}

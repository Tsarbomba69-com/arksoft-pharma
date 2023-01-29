import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core/services";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AlertService} from "@core/services/alert.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  test: string = "";
  FORM = {
    username: 'username',
    password: 'password'
  }
  form: FormGroup = this.fb.group({
    'username': ['', [Validators.required, Validators.maxLength(60)]],
    'password': ['', Validators.required]
  });
  submitted: boolean = false;
  loading: boolean = false;
  private subscription: Subscription = new Subscription();

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.alertService.messageService = this.msgService;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.subscription = this.authService
      .login(this.f[this.FORM.username].value, this.f[this.FORM.password].value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/main']);
        },
        error: err => {
          this.loading = false;
          this.alertService.errorAlert(err);
        }
      });
  }
}

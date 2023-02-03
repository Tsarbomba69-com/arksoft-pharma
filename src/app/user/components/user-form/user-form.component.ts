import {Component, OnInit} from '@angular/core';
import {Action, Role, User} from "@core/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap, Observable, Subscription} from "rxjs";
import {UserService} from "@user/services";
import {AlertService} from "@core/services";
import {MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  action: string = Action.CREATE;
  actions = Action;
  id: number = 0;
  loading: boolean = true;
  subscriptions: Subscription[] = [];
  FORM = {
    id: 'id',
    name: 'name',
    username: 'username',
    password: 'password',
    email: 'email',
    bi: 'bi',
    birthDate: 'birthDate',
    role: 'role',
  };
  pageInfo: { [key: string]: any } = {
    [Action.READ]: {
      title: 'Detalhes do Usuário',
      submitBtn: ''
    },
    [Action.UPDATE]: {
      title: 'Editar Usuário',
      submitBtn: 'Actualizar'
    },
    [Action.CREATE]: {
      title: "Registrar Usuário",
      submitBtn: 'Registrar'
    }
  };
  submitted: boolean = false;
  form: FormGroup = this.fb.group({
    [this.FORM.name]: ['', [Validators.required, Validators.maxLength(60)]],
    [this.FORM.username]: ['', [Validators.required, Validators.maxLength(60)]],
    [this.FORM.bi]: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    [this.FORM.role]: [Role.PHARMACIST, [
      Validators.required,
      Validators.pattern(String.raw`^[A-Z\u00C0-\u00ff]+[a-zA-Z\u00C0-\u00ff\s]*$`),
      Validators.maxLength(20)
    ]],
    [this.FORM.email]: ['', [Validators.required, Validators.pattern(String.raw`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`)]],
    [this.FORM.password]: ['', Validators.required],
    [this.FORM.birthDate]: this.userService.minBirthDate,
  });
  roles: string[] = [
    Role.PHARMACIST,
    Role.ADMIN,
  ];
  sexes: string[] = ['Masculino', 'Femenino', 'Outro'];
  photo: string = '';
  private submitAction: {
    [key: string]: (user: User) => Subscription;
  } = {
    [Action.CREATE]: (user: User) => {
      return this.userService.postUser(user)
        .subscribe({
          next: () => {
            this.form.reset({[this.FORM.role]: Role.PHARMACIST});
            this.alertService.successAlert('Registrado com successo!');
            this.loading = false;
          },
          error: err => {
            this.alertService.errorAlert(err);
            this.loading = false;
          },
        });
    },
    [Action.UPDATE]: (user: User) => {
      return this.userService
        .putUser({...user, id: this.id})
        .subscribe({
          error: res => {
            this.alertService.errorAlert(res);
            this.loading = false;
          },
          next: () => {
            this.form.reset();
            this.alertService.successAlert('Usuário editado!');
            this.loading = false;
            this.router.navigate(['/main/user/list']);
          },
        });
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public userService: UserService,
    private alertService: AlertService,
    private msgSrv: MessageService,
    private router: Router
  ) {
    this.alertService.messageService = msgSrv;
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.pipe(mergeMap(ps => {
        this.action = ps['action'];
        this.id = Number(ps['id']);
        if (isNaN(this.id)) {
          this.loading = false;
          return new Observable<User>();
        }
        return this.userService.getUser(this.id);
      })).subscribe({
        next: value => {
          this.loading = false;
          this.photo = value.photo!;
          this.form.patchValue(value);
        },
        error: err => {
          this.loading = false;
          this.alertService.errorAlert(err);
        }
      }));
  }

  submit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.f[this.FORM.birthDate].value) {
      const d = new Date(this.f[this.FORM.birthDate].value);
      this.f[this.FORM.birthDate].patchValue(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())));
    }
    this.f[this.FORM.bi].patchValue(this.f[this.FORM.bi].value.trim());
    this.subscriptions.push(this.submitAction[this.action](this.form.value));
  }

  uploadImage(event: any, fileUpload: FileUpload) {
    this.alertService.clear();
    this.loading = true;
    const form: FormData = new FormData();
    form.append('photo', event.files[0]);
    this.subscriptions.push(this.userService
      .uploadImage(this.id, form)
      .subscribe({
        next: user => {
          this.alertService.successAlert('Imagem carregada!');
          this.form.patchValue(user);
          this.photo = user?.photo!;
          fileUpload.clear();
          this.loading = false;
        },
        error: err => {
          this.alertService.errorAlert(err);
          fileUpload.clear();
          this.loading = false;
        },
      }));
  }
}

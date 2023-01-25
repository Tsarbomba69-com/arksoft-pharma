import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from '@core/components';
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import {RouterModule, RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    LoginFormComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ReactiveFormsModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    RouterOutlet,
    RouterModule
  ],
  providers: [MessageService]
})
export class CoreModule {
}

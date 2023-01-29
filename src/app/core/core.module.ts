import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {HeaderComponent, FooterComponent, LoginFormComponent} from '@core/components';
import {RouterModule, RouterOutlet} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    LoginFormComponent,
    HeaderComponent,
    FooterComponent
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
    RouterModule,
    TooltipModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [MessageService]
})
export class CoreModule {
}

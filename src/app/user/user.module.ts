import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from '@user/components';
import { UserListComponent, UserFormComponent } from '@user/components';
import {MenuModule} from "primeng/menu";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PanelModule} from "primeng/panel";
import {ReactiveFormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {PasswordModule} from "primeng/password";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {OverlayPanelModule} from "primeng/overlaypanel";


@NgModule({
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MenuModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    PanelModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    CalendarModule,
    ToastModule,
    TableModule,
    OverlayPanelModule,
  ]
})
export class UserModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "@core/components";
import {DashboardComponent} from "@user/components";
import {AuthGuard} from "@core/guards";
import {Role} from "@core/models";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: "full"},
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {role: [Role.DOCTOR, Role.PHARMACEUTICAL]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

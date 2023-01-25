import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "@core/components";
import {DashboardComponent} from "@user/components";
import {AuthGuard} from "@core/guards";
import {Role} from "@core/models";
import {MainComponent} from "@core/components/main/main.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: "full"},
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {role: [Role.DOCTOR, Role.PHARMACEUTICAL, Role.ADMIN]},
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

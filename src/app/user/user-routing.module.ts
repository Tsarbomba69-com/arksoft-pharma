import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent, MainComponent} from "@core/components";
import {AuthGuard} from "@core/guards";
import {Role} from "@core/models";
import {UserListComponent, DashboardComponent, UserFormComponent} from "@user/components";

const routes: Routes = [
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {role: [Role.ADMIN]},
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'list', component: UserListComponent},
      {path: ':action/:id', component: UserFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

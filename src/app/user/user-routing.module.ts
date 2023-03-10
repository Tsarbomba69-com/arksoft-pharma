import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent, UserFormComponent} from "@user/components";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: "full"},
  {path: 'list', component: UserListComponent},
  {path: ':action/:id', component: UserFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

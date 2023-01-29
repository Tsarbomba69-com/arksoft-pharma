import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuard} from "@core/guards";
import {Role} from "@core/models";
import {LoginFormComponent} from "@core/components";
import {DashboardComponent} from "@user/components";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {role: [Role.ADMIN]},
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'user',
        loadChildren: () => import('@user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'product',
        loadChildren: () => import('@product/product.module').then(m => m.ProductModule),
        data: {role: [Role.ADMIN, Role.PHARMACEUTICAL]}
      },
    ]
  },
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

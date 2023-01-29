import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@core/guards";
import {ProductListComponent} from '@product/components';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: "full"},
  {
    path: 'list',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}

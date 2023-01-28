import {Component, TemplateRef} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "@core/services";
import {RouteInfo} from "@core/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: RouteInfo[] = [
    {
      title: 'Dashboard',
      path: '/user/dashboard',
      icon: 'pi pi-chart-bar'
    },
    {
      title: 'Usuários',
      path: '/user/list',
      icon: 'pi pi-users'
    }
  ];

  constructor(private offcanvasService: NgbOffcanvas, public authService: AuthService) {
  }

  open(sidenav: TemplateRef<any>) {
    this.offcanvasService.open(sidenav, {ariaLabelledBy: 'offcanvas-basic-title'});
  }
}

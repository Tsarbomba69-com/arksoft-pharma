import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "@core/services";
import {Role, RouteInfo} from "@core/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  rolePath: { [key: string]: RouteInfo[] } = {
    [Role.ADMIN]: [
      {
        title: 'Dashboard',
        path: '/main',
        icon: 'pi pi-chart-bar'
      },
      {
        title: 'Usuários',
        path: '/main/user',
        icon: 'pi pi-users'
      },
      {
        title: 'Produtos',
        path: '/main/product',
        icon: 'pi pi-box'
      }
    ]
  };

  constructor(private offcanvasService: NgbOffcanvas, public authService: AuthService) {
  }

  ngOnInit() {
    this.items = this.rolePath[this.authService.currentUser?.role!];
  }

  open(sidenav: TemplateRef<any>) {
    this.offcanvasService.open(sidenav, {ariaLabelledBy: 'offcanvas-basic-title'});
  }
}

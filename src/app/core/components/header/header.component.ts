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
  items: RouteInfo[] = [];

  rolePath: { [key: string]: RouteInfo[] } = {
    [Role.ADMIN]: [
      {
        title: 'Dashboard',
        path: '/main',
        icon: 'pi pi-chart-bar',
        children: []
      },
      {
        title: 'Usuários',
        path: '/main/user',
        icon: 'pi pi-users',
        children: []
      },
      {
        title: 'Produtos',
        path: '/main/product',
        icon: 'pi pi-box',
        children: [{title: 'Categorias', path: '/main/user', icon: 'pi pi-book', children: []}]
      },
      {
        title: 'Vendas',
        path: '/main/order',
        icon: 'pi pi-shopping-cart',
        children: []
      }
    ],
    [Role.PHARMACIST]: [
      {
        title: 'Dashboard',
        path: '/main',
        icon: 'pi pi-chart-bar',
        children: []
      },
      {
        title: 'Vendas',
        path: '/main/order',
        icon: 'pi pi-shopping-cart',
        children: []
      }
    ]
  };
  dropdownStyle: string = '';

  constructor(private offcanvasService: NgbOffcanvas, public authService: AuthService) {
  }

  ngOnInit() {
    this.items = this.rolePath[this.authService.currentUser?.role!];
  }

  open(sidenav: TemplateRef<any>) {
    this.offcanvasService.open(sidenav, {ariaLabelledBy: 'offcanvas-basic-title'});
  }

  dropdown() {
    this.dropdownStyle = this.dropdownStyle ? 'dropdown' : '';
  }
}

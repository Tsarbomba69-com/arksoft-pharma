import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'arksoft-pharma';

  constructor(private titleService: Title) {
    this.titleService.setTitle("ArkSoft Pharma | Software de Gestão de Farmácia");
  }
}

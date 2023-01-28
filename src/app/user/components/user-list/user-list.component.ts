import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, Action} from "@core/models";
import {UserService} from "@user/services";
import {Subscription} from "rxjs";
import {AlertService} from "@core/services";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  action = Action;
  loading: boolean = true;
  filteredUsers: User[] = [];
  users: User[] = [];
  actions = Action;
  first: number = 0;
  rows: number = 10;
  subscription: Subscription = new Subscription();

  constructor(
    public userService: UserService,
    private alertService: AlertService,
    private msgSrv: MessageService) {
    this.alertService.messageService = this.msgSrv;
  }

  ngOnInit() {
    this.subscription = this.userService.getUsers().subscribe({
      next: us => {
        this.users = us;
        this.filteredUsers = us;
        this.loading = false;
      },
      error: err => {
        this.alertService.errorAlert(err);
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

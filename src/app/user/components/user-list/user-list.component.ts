import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, Action} from "@core/models";
import {UserService} from "@user/services";
import {Subscription} from "rxjs";
import {AlertService} from "@core/services";
import {ConfirmationService, MessageService} from "primeng/api";

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
  subscriptions: Subscription[] = [];

  constructor(
    public userService: UserService,
    private alertService: AlertService,
    private msgSrv: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.alertService.messageService = this.msgSrv;
  }

  ngOnInit() {
    this.subscriptions.push(this.userService.getUsers().subscribe({
      next: us => {
        this.users = us;
        this.filteredUsers = us;
        this.loading = false;
      },
      error: err => {
        this.alertService.errorAlert(err);
        this.loading = false;
      },
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  delete(userlId: number, index: number) {
    this.confirmationService.confirm({
      message: `Tem a certeza que deseja remover o ${this.users[index].role} ${this.users[index].name}?`,
      accept: () => {
        this.loading = true;
        this.subscriptions.push(
          this.userService.deleteUser(userlId).subscribe({
            next: () => {
              this.alertService.successAlert('Usuário removido');
              this.users.splice(index, 1);
              this.filteredUsers = this.users;
              this.loading = false;
            },
            error: err => {
              this.alertService.errorAlert(err);
              this.loading = false;
            },
          })
        );

      }
    });
  }

  searchUsers(el: HTMLInputElement) {
    const text = el.value;
    if (text.length <= 2) {
      this.filteredUsers = this.users;
      return;
    }
    const regex = new RegExp(text.trim(), 'i');
    this.filteredUsers = this.users.filter(u =>
      regex.test(u.name) ||
      regex.test(u.username) ||
      regex.test(u.bi) ||
      regex.test(u.role));
  }

}

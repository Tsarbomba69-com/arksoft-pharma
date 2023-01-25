import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {User} from "@core/models";
import {environment} from "@env/environment";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userBS: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private userURL: string = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient, private router: Router) {
    const userJson = localStorage.getItem('user');
    const user = userJson !== null ? JSON.parse(userJson) : null;
    this.userBS = new BehaviorSubject<User | null>(user);
  }

  public get currentUser(): User | null {
    return this.userBS.value;
  }

  login(username: any, password: any) {
    return this.http
      .post<User>(`${this.userURL}/login`, {username, password})
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userBS.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userBS.next(null);
    this.router.navigate(['/user/login']);
  }
}

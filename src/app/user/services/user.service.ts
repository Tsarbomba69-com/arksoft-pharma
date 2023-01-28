import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {User} from "@core/models";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL: string = `${environment.apiUrl}/Users`;
  public minBirthDate: Date = new Date(new Date().getTime() - 504921600000);

  constructor(private http: HttpClient) {
  }

  public calculateAge(birthDate: string | Date): number {
    birthDate = new Date(birthDate);
    const today = new Date();
    let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
    today.setFullYear(today.getFullYear() - age);
    if (birthDate > today) age--;
    return age;
  }

  postUser(user: User) {
    return this.http.post<User>(this.userURL, user);
  }

  getUsers() {
    return this.http.get<User[]>(this.userURL).pipe(
      map(us => us.map(u => {
        u.password = '';
        return u;
      }))
    );
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.userURL}/${id}`).pipe(tap(u => {
      u.password = '';
      return u;
    }));
  }

  putUser(user: User) {
    return this.http.put<User>(`${this.userURL}/${user.id}`, user);
  }
}

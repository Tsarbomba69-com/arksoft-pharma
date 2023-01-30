import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {User} from "@core/models";
import {filter, map, tap} from "rxjs";
import {AuthService} from "@core/services";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL: string = `${environment.apiUrl}/Users`;
  public minBirthDate: Date = new Date(new Date().getTime() - 504921600000);

  constructor(private http: HttpClient, private authService: AuthService) {
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
    return this.http.get<User[]>(this.userURL)
      .pipe(map(us => us.filter(u => u.id !== this.authService.currentUser?.id)));
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.userURL}/${id}`);
  }

  putUser(user: User) {
    return this.http.put<User>(`${this.userURL}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userURL}/${id}`);
  }

  uploadImage(id: number, form: FormData) {
    return this.http.put<User>(`${this.userURL}/${id}/photo`, form, {
      reportProgress: true,
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user-model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _user = new BehaviorSubject<UserModel>(null);

  readonly user$ = this._user.asObservable();

  private get user(): UserModel {
    return this._user.getValue();
  }

  private set user(val: UserModel) {
    this._user.next(val);
  }

  constructor(public  http: HttpClient) { }

  setCurrentUser(user: UserModel) {
    this.user = user;
  }

  Login(params: LoginModel) {
    const url = environment.apiUrl + '/login';
    return this.http.post<string>(url, params).pipe(map(res => res));
  }

  GetUser(id: string) {
    const url = environment.apiUrl + `/user/${id}`;
    this.http.get<UserModel>(url).pipe(map(res => res)).subscribe(res => {
      this.setCurrentUser(res);
    });
  }

  UpdateUser(params: UserModel) {
    const url = environment.apiUrl + `/user/${params.id}`;
    return this.http.put<UserModel>(url, params).pipe(map(res => res));
  }

}

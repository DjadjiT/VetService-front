import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UserService} from "../../services/user-service/user.service";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminListResolver implements Resolve<User[]> {

  constructor(private userService: UserService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getUserListByRole("admin");
  }
}

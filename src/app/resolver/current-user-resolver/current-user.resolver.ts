import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../models/user";
import {UserService} from "../../services/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<User> {

  constructor(private userService: UserService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getCurrentUser();
  }
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth-service/auth.service";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user-service/user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  private baseUrl: string = environment.proxy+environment.baseUrl;

  constructor(private authService: AuthService, private router: Router,
              private userService: UserService, private http: HttpClient) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasRole(route.data.role)
  }

  async hasRole(role: string): Promise<boolean> {
    let header = this.authService.getAuthorizationHeadersWithToken()
    let user = await this.http.get<User>(this.baseUrl + "/user", {headers: header}).toPromise()

    return user.role === role;

  }


}

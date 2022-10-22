import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../../services/auth-service/auth.service";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  private baseUrl: string = environment.proxy+environment.baseUrl;

  constructor(private authService: AuthService, private router: Router,
              private http: HttpClient) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn()
  }

  async isLoggedIn(): Promise<boolean> {
    let header = this.authService.getAuthorizationHeadersWithToken()
    await this.http.get<boolean>(this.baseUrl + "/user", {headers: header}).toPromise().catch(err => {
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    })

    return true
  }
}

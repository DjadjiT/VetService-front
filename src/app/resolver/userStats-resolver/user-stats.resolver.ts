import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AuthService} from "../../services/auth-service/auth.service";
import {StatsServiceService} from "../../services/stats-service/stats-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserStatsResolver implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router,
              private statsService: StatsServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.statsService.getUserStats();
  }
}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {StatsServiceService} from "../../services/stats-service/stats-service.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HrStatsResolver implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router,
              private statsService: StatsServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.statsService.getHrStats();
  }
}

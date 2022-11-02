import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast-service/toast.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";
import {Observable} from "rxjs";
import {Invoice} from "../../models/invoice";

@Injectable({
  providedIn: 'root'
})
export class StatsServiceService {
  private baseUrl: string = environment.proxy+environment.baseUrl+"/stats";

  constructor(private http: HttpClient, private toastService: ToastService,
              private router: Router, private authService: AuthService) {
  }

  getUserStats(): Observable<Invoice[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Invoice[]>(this.baseUrl+"/user", {headers: header})
  }

  getHrStats(): Observable<Invoice[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Invoice[]>(this.baseUrl+"/hr", {headers: header})
  }

  getAppointmentStats(body: any): Observable<Invoice[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.post<Invoice[]>(this.baseUrl+"/appointment",
      body,
      {headers: header})
  }
}

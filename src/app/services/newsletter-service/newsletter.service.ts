import { Injectable } from '@angular/core';
import {AuthService} from "../auth-service/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Newsletter} from "../../models/Newsletter";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private baseUrl: string = environment.proxy+environment.baseUrl+"/newsletter";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNewsletter(newsletterid: string): Observable<Newsletter>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Newsletter>(this.baseUrl+"/"+newsletterid, {headers: header}).pipe()
  }

  deleteNewsletter(newsletterid: string): Observable<Newsletter>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.delete<Newsletter>(this.baseUrl+"/"+newsletterid, {headers: header}).pipe()
  }
  getAllNewsletter(): Observable<Newsletter>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Newsletter>(this.baseUrl, {headers: header}).pipe()
  }

  postNewsletter(newsletter: Newsletter): Observable<Newsletter>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.post<Newsletter>(this.baseUrl, {
      frequency: newsletter.frequency,
      message: newsletter.message,
      object: newsletter.object,
      receiver: newsletter.receiver,
    },{headers: header}).pipe()
  }

  putNewsletter(newsletter: Newsletter): Observable<Newsletter>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.put<Newsletter>(this.baseUrl, {
      frequency: newsletter.frequency,
      message: newsletter.message,
      object: newsletter.object,
      receiver: newsletter.receiver,
    },{headers: header}).pipe()
  }
}

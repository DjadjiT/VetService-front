import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast-service/toast.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";
import {Observable} from "rxjs";;
import {environment} from "../../../environments/environment";
import {Invoice} from "../../models/invoice";
import {Product} from "../../models/Product";
import {UserService} from "../user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl: string = environment.proxy+environment.baseUrl+"/stripe";

  constructor(private http: HttpClient, private toastService: ToastService,
              private router: Router, private authService: AuthService,
              private userService: UserService) {

  }

  getMySubcription(): Observable<Invoice[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Invoice[]>(this.baseUrl+"/suscription", {headers: header})
  }

  getUserSubcriptionList(userId: string): Observable<Invoice[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Invoice[]>(this.baseUrl+"/suscription/"+userId, {headers: header})
  }

  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/product-list")
  }

  buyProduct(priceId: string, prodId: string): Observable<any>{
    return this.http.get(this.baseUrl+"/product?productId="+prodId+"&priceId="+priceId)
  }
}

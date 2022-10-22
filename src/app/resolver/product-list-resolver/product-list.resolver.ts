import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Product} from "../../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private stripeService: StripeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.stripeService.getProductList();
  }
}

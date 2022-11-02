import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Product} from "../../models/Product";
import {Order} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderInPreparationListResolver implements Resolve<Order[]> {
  constructor(private stripeService: StripeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> {
    return this.stripeService.getOrderByStatus("preparation");
  }
}

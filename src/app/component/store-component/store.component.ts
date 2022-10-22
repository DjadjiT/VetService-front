import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Product} from "../../models/Product";
import {UserService} from "../../services/user-service/user.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  productList: Product[] = []

  constructor(private route: ActivatedRoute, private stripeService: StripeService,
              private userService: UserService) {
    this.route.data.subscribe(data => this.productList = data.storeItem);
  }

  ngOnInit(): void {
  }

  async buy(prod: Product) {
    this.stripeService.buyProduct(prod.price.id, prod.id).subscribe(data => {
      this.userService.redirectToCheckout(data.sessionId)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Product} from "../../models/Product";
import {UserService} from "../../services/user-service/user.service";
import {ToastService} from "../../services/toast-service/toast.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  productList: Product[] = []
  basket: Set<Product> = new Set()

  constructor(private route: ActivatedRoute, private stripeService: StripeService,
              private userService: UserService, private toastService: ToastService) {
    this.route.data.subscribe(data => this.productList = data.storeItem);
  }

  ngOnInit(): void {
  }

  async buy() {
    let body = []
    for(let prod of this.basket){
      body.push(prod)
    }

    this.stripeService.postBuyItemList(body).subscribe(data => {
      this.userService.redirectToCheckout(data.sessionId)
    })
  }

  addToBasket(prod: Product){
    if(this.basket.has(prod)){
      this.toastService.showMessage("Le produit a déjà été rajouté panier, vous pourrez modifier les quantité dans la page de paiement." )
    }
    this.basket.add(prod)
  }

  removeFromBasket(prod: Product){
    this.basket.delete(prod)
  }

  getTotal(){
    let total = 0;
    for(const prod of this.basket){
      total+=parseFloat(prod.price.unit_amount)
    }
    return total.toFixed(2)
  }
}

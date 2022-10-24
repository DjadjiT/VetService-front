import { Injectable } from '@angular/core';
import {Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Newsletter} from "../../models/Newsletter";
import {NewsletterService} from "../../services/newsletter-service/newsletter.service";

@Injectable({
  providedIn: 'root'
})
export class NewsletterResolver implements Resolve<Newsletter[]> {
  constructor(private newsletterService: NewsletterService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Newsletter[]> {
    return this.newsletterService.getAllNewsletter();
  }
}

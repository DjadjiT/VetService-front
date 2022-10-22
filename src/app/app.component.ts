import { Component } from '@angular/core';
import {UserService} from "./services/user-service/user.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vetservice';
  isConnected: boolean = false
  role: string = ""
  loading = false;

  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(data => {
      this.isConnected = true
      this.role = data.role
    }, err =>  {

    })
  }
}

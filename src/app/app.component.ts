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
    this.userService.getCurrentUser().subscribe(data => {
      this.isConnected = true
      this.role = data.role
    }, err =>  {

    })
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
    (function(d, m){
      var kommunicateSettings = {"appId":"3ab781b0698e64a11789e6a50d3fff22e","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }
}

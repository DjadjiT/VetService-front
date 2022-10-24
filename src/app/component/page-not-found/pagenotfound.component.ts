import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  isConnected: boolean = false
  role: string = ""

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(data => {
      this.isConnected = true
      this.role = data.role
    }, err =>  {

    })
  }

  goToPage(page: string){
    this.router.navigate(["/"+page]).then(() => {
      window.location.reload();
    });
  }
}

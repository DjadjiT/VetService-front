import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SearchVetPageComponent} from "./search-vet-page/search-vet-page.component";
import {BackOfficePageComponent} from "./back-office-page/back-office-page.component";
import {VetPageComponent} from "./vet-page/vet-page.component";
import {VetSignupPageComponent} from "./vet-signup-page/vet-signup-page.component";

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "search", component: SearchVetPageComponent},
  {path: "profile", component: HomePageComponent},
  {path: "admin", component: BackOfficePageComponent},
  {path: "vet", component: VetPageComponent},
  {path: "vet-signup", component: VetSignupPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SearchVetPageComponent} from "./search-vet-page/search-vet-page.component";
import {VetPageComponent} from "./vet-page/vet-page.component";
import {VetSignupPageComponent} from "./vet-signup-page/vet-signup-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AppointementPageComponent} from "./appointement-page/appointement-page.component";
import {AdminBackOfficeComponent} from "./admin-back-office/admin-back-office.component";

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "search", component: SearchVetPageComponent},
  {path: "profile", component: ProfilePageComponent},
  {path: "appointement", component: AppointementPageComponent},
  {path: "vet", component: VetPageComponent},
  {path: "vet-signup", component: VetSignupPageComponent},
  {path : "admin", component: AdminBackOfficeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

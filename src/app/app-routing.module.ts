import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./component/home-page/home-page.component";
import {LoginPageComponent} from "./component/login-page/login-page.component";
import {SearchVetPageComponent} from "./component/search-vet-page/search-vet-page.component";
import {VetSignupPageComponent} from "./component/vet-signup-page/vet-signup-page.component";
import {ProfilePageComponent} from "./component/profile-page/profile-page.component";
import {AppointementPageComponent} from "./component/appointement-page/appointement-page.component";
import {AdminBackOfficeComponent} from "./component/admin-back-office/admin-back-office.component";
import {AuthGuardGuard} from "./guard/auth-gard/auth-guard.guard";
import {RoleGuardGuard} from "./guard/role-guard/role-guard.guard";
import {CurrentUserResolver} from "./resolver/current-user-resolver/current-user.resolver";
import {AppointmentResolver} from "./resolver/appointment-resolver/appointment.resolver";
import {AdminListResolver} from "./resolver/admin-list-resolver/admin-list.resolver";
import {VetListResolver} from "./resolver/vetList/vet-list.resolver";
import {InvalidVetResolver} from "./resolver/invalid-vet/invalid-vet.resolver";
import {ProductListResolver} from "./resolver/product-list-resolver/product-list.resolver";
import {StoreComponent} from "./component/store-component/store.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      profile: CurrentUserResolver
    }
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "store",
    component: StoreComponent,
    resolve: {
      storeItem: ProductListResolver,
    }
  },
  {
    path: "search",
    component: SearchVetPageComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: "profile",
    component: ProfilePageComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      profile: CurrentUserResolver
    }
  },
  {
    path: "appointement",
    component: AppointementPageComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      profile: CurrentUserResolver,
      appointments: AppointmentResolver
    }
  },
  {
    path: "vet-signup",
    component: VetSignupPageComponent
  },
  {
    path : "admin",
    component: AdminBackOfficeComponent,
    canActivate: [RoleGuardGuard],
    data: {
      role: "admin"
    },
    resolve: {
      adminList: AdminListResolver,
      vetList: VetListResolver,
      invalidVetList: InvalidVetResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    CurrentUserResolver
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { SearchVetPageComponent } from './component/search-vet-page/search-vet-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { VetSignupPageComponent } from './component/vet-signup-page/vet-signup-page.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GoogleMapsModule} from "@angular/google-maps";
import {HttpClientModule} from "@angular/common/http";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import { ProfileDialogComponent } from './dialog/profile-dialog/profile-dialog.component';
import { DialogRecordComponent } from './dialog/dialog-new-record/dialog-record.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AppointementPageComponent } from './component/appointement-page/appointement-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointementDetailsComponent } from './dialog/appointement-details/appointement-details.component';
import { AdminBackOfficeComponent } from './component/admin-back-office/admin-back-office.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {CdkColumnDef} from "@angular/cdk/table";
import { UserDetailsComponent } from './component/user-details/user-details.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MakeAppointmentComponent } from './dialog/make-appointment/make-appointment.component';
import {NgxStripeModule} from "ngx-stripe";
import { StoreComponent } from './component/store-component/store.component';
import { PagenotfoundComponent } from './component/page-not-found/pagenotfound.component';
import { FailComponent } from './component/fail/fail.component';
import { SuccessComponent } from './component/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
    LoginPageComponent,
    SearchVetPageComponent,
    VetSignupPageComponent,
    ProfileDialogComponent,
    DialogRecordComponent,
    AppointementPageComponent,
    AppointementDetailsComponent,
    AdminBackOfficeComponent,
    UserDetailsComponent,
    MakeAppointmentComponent,
    StoreComponent,
    PagenotfoundComponent,
    FailComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSortModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgxStripeModule.forRoot("pk_test_51LJDWtK6LFtOfBbRrWP5qGJhELzxImM2zjRUOhc2xZENnCxGySmw5zsnBh05OapNhcDFr9HuaiIynYgpg7tyIsoP00llplV2Qh")
  ],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    HttpClientModule,
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

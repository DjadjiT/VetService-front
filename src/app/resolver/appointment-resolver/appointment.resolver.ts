import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentResolver implements Resolve<boolean> {


  constructor(private appointmentService: AppointmentServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.appointmentService.getMyAppointment()
  }
}

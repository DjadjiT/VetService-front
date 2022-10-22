import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast-service/toast.service";
import {AuthService} from "../auth-service/auth.service";
import {Observable} from "rxjs";
import {HealthRecord} from "../../models/healthRecord";
import {Note} from "../../models/note";
import {Vaccin} from "../../models/vaccin";

@Injectable({
  providedIn: 'root'
})
export class HealthRecordServiceService {

  private baseUrl: string = environment.proxy+environment.baseUrl+"/health-record";

  constructor(private http: HttpClient, private toastService: ToastService,
              private authService: AuthService) { }

  getHealthRecord(id: number): Observable<HealthRecord>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<HealthRecord>(this.baseUrl+"/"+id, {headers: header})
  }

  deleteHealthRecord(id: string): Observable<HealthRecord>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.delete<HealthRecord>(this.baseUrl+"/"+id, {headers: header})
  }

  postHealthRecord(body: any): Observable<HealthRecord>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.post<HealthRecord>(this.baseUrl,
      {
        type: body.type,
        name: body.name,
        race: body.race,
        birthDate: body.birthDate,
        sex: body.sex,
        sterilised : body.sterilised,
        vaccins: body.vaccins,
        notes: body.notes,
      }, {headers: header})
  }

  putHealthRecord(body: any): Observable<HealthRecord>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.put<HealthRecord>(this.baseUrl,
      {
        _id: body.id,
        type: body.type,
        name: body.name,
        race: body.race,
        birthDate: body.birthDate,
        sex: body.sex,
        sterilised : body.sterilised,
        vaccins: this.convertVaccin(body.vaccins),
        notes: this.convertNotes(body.notes),
      }, {headers: header})
  }

  convertNotes(notes: Note[]): any[]{
    let noteBody: any[] = []
    notes.forEach(note => {
      noteBody.push({
        informations: note.informations,
        date: note.date,
      })
    })
    return noteBody
  }


  convertVaccin(vaccins: Vaccin[]): any[]{
    let vaccinBody: any[] = []
    vaccins.forEach(vaccin => {
      vaccinBody.push({
        name: vaccin.name,
        dateVaccin: vaccin.dateVaccin,
        dateRecall: vaccin.dateRecall,
      })
    })
    return vaccinBody
  }
}

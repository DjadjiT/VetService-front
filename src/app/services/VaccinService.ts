import {FormArray} from "@angular/forms";
import {Vaccin} from "../models/vaccin";

export class VaccinService{
  static formArrayToList(vaccins: FormArray): Vaccin[]{
    let vaccinList: Vaccin[] = []
    for(let i : number= 0; i< vaccins.length; i++){
      if(vaccins.at(i).get("dateVaccin")?.value &&
        vaccins.at(i).get("name")?.value) {
        vaccinList.push(new Vaccin(
          vaccins.at(i).get("name")?.value,
          vaccins.at(i).get("dateVaccin")?.value,
          vaccins.at(i).get("dateRecall")?.value,
        ))
      }
    }
    return vaccinList
  }
}

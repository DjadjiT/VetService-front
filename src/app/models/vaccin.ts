export class Vaccin{
  name: String
  dateVaccin: Date
  dateRecall?: Date


  constructor(name: String, dateVaccin: Date, dateRappel?: Date) {
    this.name = name;
    this.dateVaccin = dateVaccin;
    this.dateRecall = dateRappel;
  }
}

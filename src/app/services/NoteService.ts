import {FormArray} from "@angular/forms";
import {Note} from "../models/note";

export class NoteService{
  static formArrayToList(notes: FormArray): Note[]{
    let noteList: Note[] = []
    for(let i : number= 0; i< notes.length; i++){
      if(notes.at(i).get("informations")){
        let date: Date = new Date(notes.at(i).get("date")?.value)
        let note: Note = new Note(
          notes.at(i).get("informations")?.value,
          date
        );
        noteList.push(note)
      }
    }
    return noteList
  }
}

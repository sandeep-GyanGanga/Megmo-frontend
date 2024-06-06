import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  loadDraftquizze = new BehaviorSubject<boolean>(false);

  draftQuizzeId: any;

  constructor() { }
}

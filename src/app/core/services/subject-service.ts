import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjectsUrl = 'assets/data/subjects.json';

  constructor(private http: HttpClient) { }

  get(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl);
  }
}

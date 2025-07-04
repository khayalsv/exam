import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examUrl = 'assets/data/exams.json';

  constructor(private http: HttpClient) { }

  get(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examUrl);
  }
}

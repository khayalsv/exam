import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = 'assets/data/students.json';

  constructor(private http: HttpClient) { }

  get(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StudentService } from '../../core/services/student-service';
import { Student } from '../../core/models/Student';

@Component({
  selector: 'app-student',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentComponent {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.get().subscribe(data => {
      this.students = data;
    });
  }
}

import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Exam } from '../../core/models/Exam';
import { ExamService } from '../../core/services/exam-service';
import { StudentService } from '../../core/services/student-service';
import { Student } from '../../core/models/Student';


@Component({
  selector: 'app-exam',
  imports: [ButtonModule,
    CardModule, CommonModule,
  ],
  templateUrl: './exam.html',
})
export class ExamComponent {
  exams: Exam[] = [];
  students: Student[] = [];

  constructor(private examService: ExamService, private studentService: StudentService) { }

  ngOnInit() {
    this.examService.get().subscribe(exams => {
      this.studentService.get().subscribe(students => {
        // Student ID-yə görə sürətli axtarış üçün Map düzəldirik
        const studentMap = new Map<number, any>();
        students.forEach(student => {
          studentMap.set(student.id, student);
        });

        // Exam-ları enrich edirik
        this.exams = exams.map(exam => {
          const student = studentMap.get(exam.studentId);

          return {
            ...exam,
            studentName: student ? `${student.firstName} ${student.lastName}` : 'Naməlum',
            schoolClass: student?.schoolClass,
            gender: student?.gender
          };
        });

        console.log('Birləşdirilmiş Exams:', this.exams);
      });
    });

  }

  getGradeColor(grade: number): string {
    switch (grade) {
      case 5: return '#22c55e';
      case 4: return '#3b82f6';
      case 3: return '#f97316';
      case 2: return '#ef4444';
      default: return '#6b7280';
    }
  }
}

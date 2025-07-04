import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Exam } from '../../core/models/Exam';
import { ExamService } from '../../core/services/exam-service';


@Component({
  selector: 'app-exam',
  imports: [ButtonModule,
    CardModule, CommonModule,
  ],
  templateUrl: './exam.html',
})
export class ExamComponent {
  exams: Exam[] = [];

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.get().subscribe(data => {
      this.exams = data;
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

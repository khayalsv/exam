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
  styleUrl: './exam.css'
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
      case 5: return '#22c55e'; // yaşıl
      case 4: return '#3b82f6'; // mavi
      case 3: return '#f97316'; // narıncı
      case 2: return '#ef4444'; // qırmızı
      default: return '#6b7280'; // boz (naməlum)
    }
  }

  // protected title = 'app';

  // theme = themeQuartz;

  // rowData = [
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ];

  // colDefs: ColDef[] = [
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price" },
  //   { field: "electric" }
  // ];

  // isDarkMode: boolean = false;

  // ngOnInit() {
  //   const theme = localStorage.getItem('theme');
  //   const element = document.querySelector('html');
  //   if (element) {
  //     if (theme === 'true') {
  //       element.classList.add('dark');
  //       this.isDarkMode = true;
  //     } else {
  //       this.isDarkMode = false;
  //     }
  //   }
  // }

  // toggleDarkMode() {
  //   const element = document.querySelector('html');
  //   if (element) {
  //     element.classList.toggle('dark');
  //     localStorage.setItem('theme', element.classList.contains('dark') ? 'true' : 'false');
  //   }
  // }

}

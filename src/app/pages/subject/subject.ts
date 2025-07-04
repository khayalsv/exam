import { Component } from '@angular/core';
import { Subject } from '../../core/models/Subject';
import { SubjectService } from '../../core/services/subject-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-subject',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './subject.html',
  styleUrl: './subject.css'
})
export class SubjectComponent {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }
}

import { Component } from '@angular/core';
import { Subject } from '../../core/models/Subject';
import { SubjectService } from '../../core/services/subject-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  imports: [CommonModule],
  templateUrl: './lesson.html',
  styleUrl: './lesson.css'
})
export class Lesson {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }
}

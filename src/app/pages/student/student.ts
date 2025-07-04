import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StudentService } from '../../core/services/student-service';
import { Student } from '../../core/models/Student';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-student',
  imports: [CommonModule, CardModule, ButtonModule, Dialog, FormsModule, InputTextModule, Select, FloatLabelModule],
  templateUrl: './student.html',
})
export class StudentComponent {
  students: Student[] = [];
  findStudent: any;
  visible: boolean = false;
  genderOptions = [
    { label: 'Oğlan', value: 'male' },
    { label: 'Qız', value: 'female' }
  ];

  constructor(private studentService: StudentService, private messageService: MessageService) { }

  ngOnInit() {
    this.studentService.get().subscribe(data => {
      this.students = data;
    });
  }

  showDialog() {
    this.visible = true;
  }

  onEdit(id: number): void {
    this.visible = true;
    const student = this.students.find(x => x.id === id);
    this.findStudent = student ? { ...student } : {};
  }

  onSubmit(): void {
    if (!this.findStudent || !this.findStudent.id) return;

    const index = this.students.findIndex(s => s.id === this.findStudent.id);
    if (index !== -1) {
      this.students[index] = { ...this.findStudent };
    }

    this.visible = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Uğurlu əməliyyat',
      detail: 'Şagirdin məlumatı yeniləndi'
    });
  }
}
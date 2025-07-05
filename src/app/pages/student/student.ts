import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StudentService } from '../../core/services/student-service';
import { Student } from '../../core/models/Student';
import { Dialog } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
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

  onAdd(): void {
    this.findStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      schoolClass: 1,
      gender: 'male'
    };
    this.visible = true;
  }

  onEdit(id: number): void {
    this.visible = true;
    const student = this.students.find(x => x.id === id);
    this.findStudent = student ? { ...student } : {};
  }

  private generateNewId(): number {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    return maxId + 1;
  }

  onSubmit(studentForm: NgForm): void {
    if (!this.findStudent) return;

    if (this.findStudent.id) {

      const index = this.students.findIndex(s => s.id === this.findStudent.id);
      if (index !== -1) {
        this.students[index] = { ...this.findStudent };
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Uğurlu əməliyyat',
        detail: 'Şagirdin məlumatı yeniləndi'
      });
    } else {

      const newId = this.generateNewId();
      const newStudent = { ...this.findStudent, id: newId };
      this.students.push(newStudent);

      this.messageService.add({
        severity: 'success',
        summary: 'Uğurlu əməliyyat',
        detail: 'Yeni şagird əlavə olundu'
      });
    }

    studentForm.resetForm();
    this.findStudent = null;
    this.visible = false;
  }

  onDelete(id: number): void {
    this.students = this.students.filter(student => student.id !== id);

    this.messageService.add({
      severity: 'warn',
      summary: 'Silindi',
      detail: `ID-si ${id} olan şagird silindi`
    });

    if (this.findStudent?.id === id) {
      this.visible = false;
      this.findStudent = null;
    }
  }

  searchText: string = '';
  filteredStudents() {
    const search = this.searchText?.trim().toLowerCase();

    if (!search) {
      return this.students;
    }

    return this.students.filter(s => {
      const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
      return (
        fullName.includes(search) ||
        String(s.id).includes(search) ||
        String(s.schoolClass).includes(search)
      );
    });
  }
}
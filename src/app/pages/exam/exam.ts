import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Exam } from '../../core/models/Exam';
import { ExamService } from '../../core/services/exam-service';
import { StudentService } from '../../core/services/student-service';
import { Student } from '../../core/models/Student';
import { Dialog } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SubjectService } from '../../core/services/subject-service';
import { Subject } from '../../core/models/Subject';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-exam',
  imports: [CommonModule, CardModule, ButtonModule, Dialog, FormsModule,
    InputTextModule, Select, FloatLabelModule],
  templateUrl: './exam.html',
})
export class ExamComponent {
  exams: Exam[] = [];
  students: Student[] = [];
  subjectCodes: Subject[] = [];
  findExam: any;
  visible = false

  constructor(private examService: ExamService, private studentService: StudentService,
    private subjectService: SubjectService, private messageService: MessageService) { }

  ngOnInit() {
    this.examService.get().subscribe(exams => {
      this.studentService.get().subscribe(students => {
        this.subjectService.get().subscribe(subjects => {

          this.students = students;

          this.subjectCodes = subjects;

          const studentMap = new Map<number, any>();
          students.forEach(student => {
            studentMap.set(student.id, student);
          });

          this.exams = exams.map(exam => {
            const student = studentMap.get(exam.studentId);

            return {
              ...exam,
              studentName: student ? `${student.firstName} ${student.lastName}` : 'Naməlum',
              schoolClass: student?.schoolClass,
              gender: student?.gender
            };
          });

        });
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

  onAdd(): void {
    this.findExam = {
      examDate: '',
      grade: 1,
      studentId: null,
      subjectCode: ''
    };
    this.visible = true;
  }

  private generateNewId(): number {
    const maxId = this.exams.length > 0 ? Math.max(...this.exams.map(s => s.id)) : 0;
    return maxId + 1;
  }

  onExamSubmit(examForm: NgForm): void {
    if (!this.findExam) return;

    const selectedStudent = this.findExam.student;
    if (!selectedStudent) return;

    const studentId = selectedStudent.id;
    const firstName = selectedStudent.firstName;
    const lastName = selectedStudent.lastName;
    const fullName = `${firstName} ${lastName}`;
    const subjectCode = this.findExam.subjectCode;
    const examDate = this.findExam.examDate;

    const isDuplicate = this.exams.some(e =>
      e.studentId === studentId &&
      e.subjectCode === subjectCode &&
      e.examDate === examDate &&
      e.id !== this.findExam.id
    );

    if (isDuplicate) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Dublikat məlumat',
        detail: 'Bu şagird üçün bu tarixdə və bu fənndə artıq imtahan mövcuddur'
      });
      return;
    }

    if (this.findExam.id) {
      // Mövcud imtahanı yenilə
      const index = this.exams.findIndex(e => e.id === this.findExam.id);
      if (index !== -1) {
        this.exams[index] = {
          ...this.findExam,
          studentId,
          studentName: fullName,
          firstName,
          lastName
        };
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Uğurlu əməliyyat',
        detail: 'İmtahan məlumatı yeniləndi'
      });
    } else {
      const newId = this.generateNewId();

      const newExam = {
        ...this.findExam,
        id: newId,
        studentId,
        studentName: fullName,
        firstName,
        lastName
      };

      this.exams.push(newExam);

      this.messageService.add({
        severity: 'success',
        summary: 'Uğurlu əməliyyat',
        detail: 'Yeni imtahan əlavə olundu'
      });
    }

    examForm.resetForm();
    this.findExam = null;
    this.visible = false;
  }

  onEdit(exam: Exam) {
    // exam.studentId ilə uyğun student-i tapın
    const student = this.students.find(s => s.id === exam.studentId);

    this.findExam = {
      ...exam,
      student: student ? { ...student } : null
    };

    this.visible = true;
  }
  
  onDelete(id: number): void {
    this.exams = this.exams.filter(exam => exam.id !== id);

    this.messageService.add({
      severity: 'warn',
      summary: 'Silindi',
      detail: `ID-si ${id} olan imtahan silindi`
    });

    if (this.findExam?.id === id) {
      this.visible = false;
      this.findExam = null;
    }
  }
}

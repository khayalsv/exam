export interface Exam {
  id:number;
  studentId: number;
  studentName: string;
  subjectName: string;
  subjectCode: string;
  examDate: Date;
  grade: number;
}
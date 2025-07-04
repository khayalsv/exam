import { Routes } from '@angular/router';
import { ExamComponent } from './pages/exam/exam';
import { StudentComponent } from './pages/student/student';
import { Layout } from './layout/layout';
import { SubjectComponent } from './pages/subject/subject';

export const routes: Routes = [
  {
    path: '', component: Layout,
    children: [
      { path: '', component: ExamComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'student', component: StudentComponent },
    ]
  },

];

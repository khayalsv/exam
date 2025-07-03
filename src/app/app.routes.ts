import { Routes } from '@angular/router';
import { Exam } from './pages/exam/exam';
import { Lesson } from './pages/lesson/lesson';
import { Student } from './pages/student/student';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '', component: Layout,
    children: [
      { path: '', component: Exam },
      { path: 'lesson', component: Lesson },
      { path: 'student', component: Student },
    ]
  },

];

import { Component } from '@angular/core';
import { Subject } from '../../core/models/Subject';
import { SubjectService } from '../../core/services/subject-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColDef, colorSchemeDark, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DeleteButtonRendererComponent } from '../../components/delete-button/delete-button';
import { MessageService } from 'primeng/api';
import { ThemeService } from '../../core/services/theme-service';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-subject',
  imports: [CommonModule, CardModule, ButtonModule, Dialog, AgGridAngular, Tooltip],
  templateUrl: './subject.html',
})

export class SubjectComponent {
  subjects: Subject[] = [];
  visible: boolean = false;
  theme = themeQuartz;

  constructor(
    private subjectService: SubjectService,
    private messageService: MessageService,
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.subjectService.get().subscribe(data => {
      this.subjects = data;
    });


    this.theme = this.themeService.getTheme();
  }

  showDialog() {
    this.visible = true;
  }

  colDefs: ColDef[] = [
    {
      headerName: 'Əməliyyat',
      field: 'actions',
      cellRenderer: DeleteButtonRendererComponent,
      cellRendererParams: {
        onDelete: (data: Subject) => this.onDeleteSubject(data)
      },
      width: 100,
      suppressMovable: true
    },
    { field: 'code', headerName: 'Fənn Kodu', width: 100, editable: true },
    { field: 'name', headerName: 'Fənn Adı', width: 150, editable: true },
    { field: 'schoolClass', headerName: 'Sinif', width: 80, editable: true },
    { field: 'teacherFirstName', headerName: 'Müəllimin Adı', width: 150, editable: true },
    { field: 'teacherLastName', headerName: 'Müəllimin Soyadı', width: 150, editable: true }
  ];

  onDeleteSubject(subject: Subject) {
    this.subjects = this.subjects.filter(s => s !== subject);
  }

  onAddSubject() {
    const lastSubject = this.subjects.length ? this.subjects[this.subjects.length - 1] : null;

    const isLastSubjectComplete = lastSubject
      ? lastSubject.code.trim() !== '' &&
      lastSubject.name.trim() !== '' &&
      lastSubject.schoolClass > 0 &&
      lastSubject.teacherFirstName.trim() !== '' &&
      lastSubject.teacherLastName.trim() !== ''
      : true;

    if (!isLastSubjectComplete) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Son əlavə edilən dərsi tamamlayın, sonra yenisini əlavə edin', life: 1500 });
      return;
    }

    const newSubject: Subject = {
      code: '',
      name: '',
      schoolClass: 1,
      teacherFirstName: '',
      teacherLastName: ''
    };

    this.subjects = [...this.subjects, newSubject];
  }

  onCellValueChanged(event: any): void {
    const field = event.colDef.field;
    const newValue = (typeof event.newValue === 'string') ? event.newValue.trim() : event.newValue;
    const oldValue = event.oldValue;

    if (newValue === oldValue) return;

    const node = event.node;

    const showErrorAndRevert = (message: string) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Xəta',
        detail: message,
        life: 2000
      });

      node.data[field] = oldValue;

      event.api.refreshCells({ rowNodes: [node], columns: [field] });
    };

    switch (field) {
      case 'code':
        if (!newValue || newValue.length !== 3) {
          showErrorAndRevert('Fənn kodu dəqiq 3 hərfdən ibarət olmalıdır');
          return;
        }
        break;

      case 'name':
        if (!newValue || newValue.length < 4 || newValue.length > 30) {
          showErrorAndRevert('Fənn adı 4-30 hərf arasında olmalıdır');
          return;
        }
        break;

      case 'schoolClass':
        const classNumber = Number(newValue);
        if (!newValue || isNaN(classNumber) || !Number.isInteger(classNumber) || classNumber < 1 || classNumber > 11) {
          showErrorAndRevert('Sinif yalnız 1 ilə 11 arasında tam ədəd olmalıdır');
          return;
        }
        break;

      case 'teacherFirstName':
        if (!newValue || newValue.length < 3 || newValue.length > 20) {
          showErrorAndRevert('Müəllimin adı 3-20 hərf arasında olmalıdır');
          return;
        }
        break;

      case 'teacherLastName':
        if (!newValue || newValue.length < 3 || newValue.length > 20) {
          showErrorAndRevert('Müəllimin soyadı 3-20 hərf arasında olmalıdır');
          return;
        }
        break;
    }
  }


}
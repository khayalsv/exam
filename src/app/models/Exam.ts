export class Exam {
  constructor(
    public subjectCode: string,
    public studentId: number,
    public examDate: Date,
    public score: number
  ) { }
}
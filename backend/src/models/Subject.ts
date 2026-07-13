import { IScore } from "./Score";

export class Subject {
  constructor(
    public readonly key: keyof IScore,
    public readonly displayName: string,
    public readonly code: string,
  ) {}

  getScoreFromRecord(record: Partial<IScore>): number | null {
    const score = record[this.key];
    return typeof score === "number" ? score : null;
  }
}

export class SubjectManager {
  private subjects: Map<keyof IScore, Subject>;

  constructor() {
    this.subjects = new Map<keyof IScore, Subject>();
    this.initializeSubjects();
  }

  private initializeSubjects(): void {
    const subjectList = [
      new Subject("toan", "Toán", "TOAN"),
      new Subject("ngu_van", "Ngữ văn", "NVAN"),
      new Subject("ngoai_ngu", "Ngoại ngữ", "NNGU"),
      new Subject("vat_li", "Vật lí", "VL"),
      new Subject("hoa_hoc", "Hóa học", "HOA"),
      new Subject("sinh_hoc", "Sinh học", "SINH"),
      new Subject("lich_su", "Lịch sử", "SU"),
      new Subject("dia_li", "Địa lí", "DIA"),
      new Subject("gdcd", "Giáo dục công dân", "GDCD"),
    ];

    for (const subject of subjectList) {
      this.subjects.set(subject.key, subject);
    }
  }

  public getAll(): Subject[] {
    return Array.from(this.subjects.values());
  }

  public getByKey(key: keyof IScore): Subject | null {
    return this.subjects.get(key) || null;
  }

  public getGroupA(): Subject[] {
    const toan = this.getByKey("toan");
    const vatLi = this.getByKey("vat_li");
    const hoaHoc = this.getByKey("hoa_hoc");

    if (toan && vatLi && hoaHoc) {
      return [toan, vatLi, hoaHoc];
    }
    return [];
  }
}

export const subjectManager = new SubjectManager();

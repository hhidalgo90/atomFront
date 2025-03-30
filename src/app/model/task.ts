export class Task {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  editing: any;
  completed: any;

  constructor(
    title?: string,
    description?: string,
    status?: string,
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}
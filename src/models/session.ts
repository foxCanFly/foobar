export class Session {
  id: string;

  auth = {
    done: false
  };

  constructor(id: string) {
    this.id = id;
  }
}

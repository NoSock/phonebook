export class Contact {
  id: string;
  name: string;
  secondName: string;
  age: number;
  phoneNumbers: string[];

  constructor() {
    this.phoneNumbers = [];
  }
}

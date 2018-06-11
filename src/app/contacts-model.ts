export class Contact {
  id: number;
  name: string;
  secondName: string;
  age: number;
  phoneNumbers: string[];

  constructor() {
    this.phoneNumbers = [];
  }
}

export let contacts: Contact[] = [
  {id: 1, name: 'Vasya', secondName: 'Pupkin', age: 800, phoneNumbers: ['123123']}
]

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.less']
})
export class ContactEditComponent implements OnInit {
  contactId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-chat-info',
  templateUrl: './patient-chat-info.page.html',
  styleUrls: ['./patient-chat-info.page.scss'],
})
export class PatientChatInfoPage implements OnInit {
  docInfo: any = [];
  constructor() { }

  ngOnInit() {
    this.docInfo = JSON.parse(localStorage.getItem('data'));
  }

}

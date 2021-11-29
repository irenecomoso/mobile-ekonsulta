import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor(private router: Router,private menu: MenuController) {}

  click(){
    window.location.href='/patient-profile';

    this.menu.close();
  }

  patientLinkClick(){
    this.router.navigateByUrl('/terms-and-conditions');
    this.menu.close();
  }
  public appPages = [
    {
      title: 'Consultation',
      url: '/patient-consultation',
      icon: 'create-outline'

    },
    {
      title: 'Transaction History',
      url: '/patient-transactionhistory',
      icon: 'time-outline'
    },
    {
      title: 'My Records',
      url: '/patient-myrecords',
      icon: 'folder-outline'
    }
    ,
    {
      title: 'Reviews',
      url: '/patient-choosefeedback',
      icon: 'chatbubble-ellipses-outline'
    }
  ];
}

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
  showSubmenu: boolean = false;
  down: boolean=false;
  up: boolean=true;
  constructor(private router: Router,private menu: MenuController) {}

  click(){
    //window.location.href='/patient-profile';
    this.router.navigate(['/patient-profile']);
    this.menu.close();
  }

  click2(){
    //window.location.href='/doctor-profile';
    this.router.navigate(['/doctor-profile']);
    this.menu.close();
  }

  LinkClick(){
    this.router.navigateByUrl('/terms-and-conditions');
    this.menu.close();
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
    if(this.showSubmenu==true){
      this.down=!this.down;
      this.up=!this.up;
    }
    else{
      this.down=!this.down;
      this.up=!this.up;
    }
  }

  public patientPages = [
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

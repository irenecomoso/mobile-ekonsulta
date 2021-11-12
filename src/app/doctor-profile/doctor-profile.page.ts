/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
export class DoctorInfo
{
  fullname: string;
  email: string;
  password: string;
  dob: string;
  contact_number: string;
  address: string ;
  license_number: string;
  specialization: string;
}
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {
  model = new DoctorInfo();

  userId: string;
  info: any = [];
  spInfo: any = [];
  spList: any = [];
  imgUrl: any;
  file: any;

  constructor(public afu: AuthService) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
  }

}

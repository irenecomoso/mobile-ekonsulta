/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFireStorage,AngularFireStorageModule } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore) { }
  get_Speciaalization()
  {
    return this.db.firestore.collection('specialization').get();
  }
  get_HealthInsurance()
  {
    return this.db.firestore.collection('Health_Insurance').get();
  }
  get_HealthInsurance_Info(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).get();
  }
  get_UserInfo(user_id: string)
  {
     return this.db.firestore.collection('Users').doc(user_id).get();
  }
}

/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFireStorage,AngularFireStorageModule } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore,public fireb: FirebaseApp, public afau: AngularFireAuth, public store: AngularFireStorage) { }
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
  get_avatar(user_id)
  {
    return this.db.firestore.collection('avatar').doc(user_id).get();
  }
  get_patient_insuranceInfo(id,ins_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info')
    .where('health_insurance','==',ins_id).get();
  }
  get_patientInfo(id)
  {
    return this.db.firestore.collection('Users').doc(id).get();
  }
  get_specializationInfo(id)
  {
    return this.db.firestore.collection('specialization').doc(id).get();
  }
  update_user(user_id,record)
  {
    const user = this.fireb.auth().currentUser;
    const newPassword = record.password;
   return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
      this.db.collection('Users').doc(user_id).update(record);
    }).catch((error)=>{
      console.log(error);
    })
  }
  upload_avatar(a, user_id)
  {
    //Uploading image into fireStorage
    this.store.ref('Users/' + user_id + '/profile.jpg').put(a).then(res =>{
      console.log('successfully uploaded!');

      //getting image URL and pass it into fireStore avatar
      this.afau.onAuthStateChanged(user => {
      if(user)
      this.store.storage.ref('Users/' + user_id + '/profile.jpg').getDownloadURL().then(e =>{
          this.db.collection('avatar').doc(user_id).set({
            image : e
          })
          console.log('Profile Changed!');
        })
      })
    }).catch(error => {
      console.log(error.message);
    })
  }
  update_patient_insurance(user_id,record)
  {
    return this.db.collection('Users').doc(user_id).update(record);
  }
  get_doctorList()
  {
    return this.db.firestore.collection('Users').where("role", "==", "doctor").get();
  }
  doctor_reply(id,feedback,name,review_id,sent_to)
  {
    return this.db.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').add({
      createdAt: formatDate(new Date(),"MM/dd/yyyy","en"),
      feedback: feedback,
      from : id,
      fullname: name,
      sent_to: sent_to,
    })
  }
  get_doctorReply(id,review_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  get_Doctor_Reviews(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  userReply_existDoc(id,user_id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_Doctor_feedback(doc_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Users').doc(doc_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  get_labPartner()
  {
    return this.db.collection('Laboratory_Partner').get();
  }
  userReply_exist(id,user_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_healthInsurance_feedback(ins_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  get_health_review(id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_insurance_reply(id,review_id)
  {
    return this.db.firestore.collection('Health_Insurance').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  userReply_existLab(id,user_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .where('from','==',user_id).get();
  }
  create_labPartner_feedback(lab_id,user_id,feedback,name)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(lab_id)
    .collection('reviews').add({
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      feedback : feedback,
      from: user_id,
      fullname: name
    })
  }
  get_Lab_Reviews(id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews')
    .orderBy('createdAt','desc').get();
  }
  get_labreply(id,review_id)
  {
    return this.db.firestore.collection('Laboratory_Partner').doc(id).collection('reviews').doc(review_id)
    .collection('reply').get();
  }
  get_doctor_upcoming(doc_id)
  {
    return this.db.firestore.collection('upcoming').where('doctor_id','==',doc_id);
  }
  get_labInfo(id)
  {
    return this.db.collection('Laboratory_Partner').doc(id).get();
  }
  get_Lab_Results_Patient(email)
  {
    return this.db.firestore.collection('Laboratory_Results').where('email','==',email).get();
  }
  get_patient_LOA(patient_id)
  {
    return this.db.firestore.collection('Insurance_LOA').where('patient_id','==',patient_id).get();
  }
  get_patient_medical(patient_id)
  {
    return this.db.firestore.collection('Medical_Records').where('patient_id','==',patient_id).get();
  }
}

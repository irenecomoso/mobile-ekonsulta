/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { FirebaseApp } from '@angular/fire';
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import{ AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router, private db: AngularFirestore, public store: AngularFireStorage,
    public fireb : FirebaseApp) {}
   //Get user Data
  get_userData()
  {
    return this.db.firestore.collection('Users').get();
  }
  loginWithEmail(email: string,password: string,role: string){
    return this.afu.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('Users',JSON.stringify(res.user));
      sessionStorage.setItem('Current',password);
    }).then(()=>{
      if(role === 'patient'){
        this.router.navigate(['/patient-profile']);
      }
      if(role === 'doctor'){
        this.router.navigate(['/doctor-profile']);
      }
    })
  }
  registerWithEmail_patient(user){
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(this.newUser);
        userCredential.user.updateProfile( {
          displayName: user.fullname
        });
        this.insertUserData_patient(userCredential)

        this.afu.onAuthStateChanged(user => {
          if(user)
        this.store.storage.ref('Users/' + 'default' + '/profile.jpg').getDownloadURL().then(e =>{
          this.db.collection('avatar').doc(userCredential.user.uid).set({
            image : e
          })
        })
      })
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
  insertUserData_patient(userCredential: firebase.default.auth.UserCredential){
    return this.db.collection('Users').doc(userCredential.user.uid).set({
      email: this.newUser.email,
      password: this.newUser.password,
      fullname: this.newUser.fullname,
      dob: this.newUser.dob,
      address : this.newUser.address,
      contact_number: this.newUser.contact_number,
      member_ID: this.newUser.member_ID,
      health_insurance : this.newUser.health_insurance,
      createdAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      updatedAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      role: 'patient',
      status:'active',
      isVerified: 'pending',
      disabled: 'false'
    }).then(()=>{
      if(this.newUser.file != undefined)
      this.store.ref('Users-Files/' + userCredential.user.uid + '/' + this.newUser.file.name)
      .put(this.newUser.file)
      .then(()=>{
        this.store.storage.ref('Users-Files/' + userCredential.user.uid + '/' + this.newUser.file.name)
        .getDownloadURL()
        .then(e=>{
          this.db.firestore.collection('Users').doc(userCredential.user.uid).collection('Verification_Files')
          .add({
            file: e
          })
        })
      })
    })
  }
  registerWithEmail_Doctor(user) {
    return this.afu.createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.newUser = user;
      console.log(this.newUser);
      userCredential.user.updateProfile( {
        displayName: user.fullname
      });
        this.insertUserData_Doctor(userCredential)

        this.afu.onAuthStateChanged(user => {
          if(user)
          this.store.storage.ref('Users/' + 'default' + '/profile.jpg').getDownloadURL().then(e =>{
            this.db.collection('avatar').doc(userCredential.user.uid).set({
              image : e
            })
          })
      })
    })
    .catch(error => {
      console.log(error)
      throw error
    });
    }
    insertUserData_Doctor(userCredential: firebase.default.auth.UserCredential): Promise<any>{
      return this.db.collection('Users').doc(userCredential.user.uid).set({
        email: this.newUser.email,
        paypal_email: this.newUser.paypal_email,
        password: this.newUser.password,
        fullname: this.newUser.fullname,
        address: this.newUser.address,
        contact_number: this.newUser.contact_number,
        license_number: this.newUser.license_number,
        specialization: this.newUser.specialization,
        dob: this.newUser.dob,
        consultation_fee : 0,
        createdAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
        updatedAt: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
        status: 'active',
        role: 'doctor',
        disabled: "false",
        isVerified: "pending"
      }).then(()=>{
        this.store.ref('Users-Files/' + userCredential.user.uid + '/' + this.newUser.file.name).put(this.newUser.file)
        .then(()=>{
          console.log("Files Stored!");
          this.store.storage.ref('Users-Files/' + userCredential.user.uid + '/' + this.newUser.file.name)
          .getDownloadURL().then(e=>{
              this.db.collection('Users').doc(userCredential.user.uid).collection('Verification_Files')
              .add({
                file: e
              })
          })
        })
      })
    }
    get_UID()
    {
    const data = JSON.parse(localStorage.getItem('Users'));
    if(data!=null){
      return data.uid
    }
    else{
      this.router.navigate(['/login']);
    }
    }
  signout(): void
  {
    this.afu.signOut();
    localStorage.removeItem('Users');
    localStorage.removeItem('data');
    this.router.navigate(['/login']);
  }
  delete_user()
  {
    return this.fireb.auth().currentUser.delete().catch(error=>{
      throw error;
    })
  }
}

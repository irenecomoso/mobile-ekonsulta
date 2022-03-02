/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
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

  constructor(public db: AngularFirestore,public fireb: FirebaseApp, public afau: AngularFireAuth, public store: AngularFireStorage,
    public router: Router) { }
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
    this.db.collection('Users').doc(user_id).update(record)
      .then(()=>{
        console.log('Updated');
      })
   return user.updatePassword(newPassword).then(()=>{
      console.log("Password Changed!");
    }).catch((error)=>{
      console.log(error);
    })
  }
  upload_avatar(a, user_id)
  {
    //Uploading image into fireStorage
    return this.store.ref('Users/' + user_id + '/profile.jpg').put(a).then(res =>{
      console.log('successfully uploaded!');

      //getting image URL and pass it into fireStore avatar
    return this.store.storage.ref('Users/' + user_id + '/profile.jpg').getDownloadURL().then(e =>{
          this.db.collection('avatar').doc(user_id).set({
            image : e
          })
          console.log('Profile Changed!');
        })
    }).catch(error => {
      console.log(error.message);
    })
  }
  update_doctor_fee(user_id,fee)
  {
    return this.db.firestore.collection('Users').doc(user_id).update(fee);
  }
  update_patient_insurance(user_id,insInfo_id,record)
  {
    return this.db.firestore.collection('Users').doc(user_id).collection('Insurance_Info')
    .doc(insInfo_id).update(record);
  }
  get_doctorEarning(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Transaction_History')
    .get();
  }
  update_password(data)
  {
    if(data.role == 'patient' && data.role == 'doctor')
    {
     return this.db.firestore.collection('Users').doc(data.id).update({
        password: data.password
      });
    }
    else if(data.role == 'Health_Insurance')
    {
     return this.db.firestore.collection('Health_Insurance').doc(data.id).update({
        password: data.password
      });
    }
    else if(data.role == 'Laboratory_Partner')
    {
     return this.db.firestore.collection('Laboratory_Partner').doc(data.id)
      .update({
        password: data.password
      })
    }
    else
    {
     return this.db.firestore.collection('Users').doc(data.id).update({
        password: data.password
      });
    }
  }
  get_admin()
  {
    return this.db.firestore.collection('Users').where('role','==','admin').get();
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
  insurance_affiliation(record)
  {
    return this.db.firestore.collection('Insurance_Affiliation')
    .add(record);
  }
  get_insurance_affiliation(id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').where('doctor_id','==',id).get();
  }
  check_affiliation(id,ins_id)
  {
    return this.db.firestore.collection('Insurance_Affiliation').where('doctor_id','==',id)
    .where('insurance_id','==',ins_id).get();
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
    return this.db.firestore.collection('upcoming').where('doctor_id','==',doc_id)
    .orderBy('id','asc');
  }
  get_labInfo(id)
  {
    return this.db.collection('Laboratory_Partner').doc(id).get();
  }
  get_UserInfo(user_id: string)
  {
     return this.db.firestore.collection('Users').doc(user_id).get();
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
  get_patient_prescription(patient_id)
  {
    return this.db.firestore.collection('Prescription').where('patient_id','==',patient_id).get();
  }
  get_patient_transaction(patient_id)
  {
    return this.db.firestore.collection('Users').doc(patient_id).collection('Transaction_History')
    .orderBy('id','desc').get();
  }
  update_transaction_insurance(userid,id,record)
  {
    return this.db.firestore.collection('Health_Insurance').doc(userid).collection('Transaction').doc(id).update(record)
    .then(()=>{
      console.log(id + " Transaction Updated!");
    })
  }
  cancel_consultation_insurance(info)
  {
    return this.db.collection('upcoming').doc(info.upcoming_id).delete()
    .then(()=>{
      console.log('Upcoming Deleted!');
      return this.db.collection('Health_Insurance').doc(info.health_insurance).collection('Transaction')
      .doc(info.transaction_id).update({
        status: "noshow"
      })
    })
  }
  get_transaction_doctor(doctor_id)
  {
    return this.db.firestore.collection('Users').doc(doctor_id).collection('Transaction_History')
    .orderBy('id','desc').get();
  }
  update_transaction_admin(id,record)
  {
    return this.db.firestore.collection('Transaction').doc(id).update(record)
    .then(()=>{
      console.log(id + " Transaction Updated!");
    })
  }
  cancel_consultation_doctor(info)
  {
    return this.db.collection('upcoming').doc(info.upcoming_id).delete().then(()=>{
      console.log('Upcoming Deleted!');
     return this.db.collection('Transaction').doc(info.transaction_id).update({
        status: "noshow"
      })
    })
  }
  get_patient_consultation(patient_id)
  {
    return this.db.firestore.collection('Consultation').where('patient_id','==',patient_id).get();
  }
  get_patient_upcoming(patient_id)
  {
    return this.db.firestore.collection('upcoming').where('patient_id','==',patient_id)
    .orderBy('id','asc');
  }
  get_schedule(doc_id)
  {
    return this.db.firestore.collection('Schedule').where('doctor_id','==',doc_id)
    .orderBy('priority','asc').get();
  }
  get_schedule_time(sched_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').get();
  }
  get_timeInfo(sched_id,time_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').doc(time_id).get();
  }
  reservationChecker(sched_id,time_id,consultation_schedule)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).collection('Time').doc(time_id)
    .collection('Reservation').where('consultation_schedule','==',consultation_schedule).get();
  }
  get_consultation(doctor_id)
  {
    return this.db.firestore.collection('Consultation').where('doctor_id','==',doctor_id).get();
  }
  get_today_consultation(doctor_id)
  {
    return this.db.firestore.collection('Consultation').where('doctor_id','==',doctor_id)
    .where('createdAt','==',formatDate(new Date(),'MM/dd/yyyy','en')).get();
  }
  create_transaction(record)
  {
    return this.db.firestore.collection('Transaction').add(record);
  }
  patient_book_schedule(record)
  {
    return this.db.firestore.collection('Schedule').doc(record.schedule_id).collection('Time').doc(record.time_id)
    .collection('Reservation').add({
      patient_id : record.patient_id,
      consultation_schedule: record.consultation_schedule,
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
    })
  }
  create_doctor_upcoming(data)
  {
    return this.db.firestore.collection('upcoming')
    .add(data)
  }
  get_scheduleInfo(sched_id)
  {
    return this.db.firestore.collection('Schedule').doc(sched_id).get();
  }
  check_upcoming(doc_id,pat_id)
  {
    return this.db.firestore.collection('upcoming').where('doctor_id','==',doc_id).where('patient_id','==',pat_id)
    .get();
  }
  update_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).update({
      status: "ongoing"
    })
  }
  send_medicalRecord(patient_id,doc_id,filename,file)
  {
   return this.store.ref('Medical-Records/' + patient_id + '/Records/' + filename).put(file)
    .then(()=>{
      this.afau.onAuthStateChanged(user=>{
        if(user)
        {
          this.store.storage.ref('Medical-Records/' + patient_id + '/Records/' + filename).getDownloadURL()
          .then(e=>{
            this.db.collection('Medical_Records').add({
              filename : filename,
              file : e,
              doctor_id: doc_id,
              patient_id: patient_id,
              createdAt : formatDate(new Date(),'MM/dd/yyyy','en')
            })
          })
        }
      })
    })
  }
  send_prescriptionRecord(patient_id,doc_id,filename,file)
  {
   return this.store.ref('Prescription-Records/' + patient_id + '/Records/' + filename).put(file)
    .then(()=>{
      this.afau.onAuthStateChanged(user=>{
        if(user)
        {
          this.store.storage.ref('Prescription-Records/' + patient_id + '/Records/' + filename).getDownloadURL()
          .then(e=>{
            this.db.collection('Prescription').add({
              filename : filename,
              file : e,
              doctor_id: doc_id,
              patient_id: patient_id,
              createdAt : formatDate(new Date(),'MM/dd/yyyy','en')
            })
          })
        }
      })
    })
  }
  cancel_consultation(info)
  {
   return this.db.collection('upcoming').doc(info.upcoming_id).delete().then(()=>{
      console.log('Upcoming Deleted!');
     return this.db.collection('Transaction').doc(info.transaction_id).update({
        status: "cancel"
      })
    })
  }
  get_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).get();
  }
  remove_upcoming(upcoming_id)
  {
    return this.db.firestore.collection('upcoming').doc(upcoming_id).delete();
  }
  removed_upcoming_trigger(patient_id)
  {
    return this.db.firestore.collection('upcoming').where('patient_id','==',patient_id);
  }
  remove_share(doctor_id,patient_id)
  {
    return this.db.firestore.collection('Shared_Files').where('doctor_id','==',doctor_id)
    .where('patient_id','==',patient_id).get().then(e=>{
      e.forEach(item=>{
        this.db.collection('Shared_Files').doc(item.id).delete();
      })
    }).then(()=>{
      console.log('Deleted Shared Files!');
    })
  }
  create_consultation(record){
    return this.db.firestore.collection('Consultation').add(record);
  }
  create_sharedFile(record)
  {
    return this.db.firestore.collection('Shared_Files').add(record);
  }
  get_sharedFile(doctor_id,patient_id)
  {
    return this.db.firestore.collection('Shared_Files').where('doctor_id','==',doctor_id)
    .where('patient_id','==',patient_id);
  }
  get_medical_shared(id)
  {
    return this.db.firestore.collection('Medical_Records').doc(id).get();
  }
  get_shareFiles()
  {
    return this.db.firestore.collection('Shared_Files').get();
  }
  get_lab_shared(id)
  {
    return this.db.firestore.collection('Laboratory_Results').doc(id).get();
  }
  get_prescription_shared(id)
  {
    return this.db.firestore.collection('Prescription').doc(id).get();
  }
  delete_user(id)
  {
   return this.db.collection('Users').doc(id).delete().then(()=>{
      this.router.navigate(['/login']);
      localStorage.removeItem('Users');
      console.log('Firestore deleted')
    })
  }
  send_labLOA(lab_id,patient_id,record)
  {
    return this.store.ref('Lab-LOA/' + lab_id + '/' + 'patients/' + patient_id + '/' + record.filename).put(record.file)
    .then(()=>{
    return  this.store.storage.ref('Lab-LOA/' + lab_id + '/' + 'patients/' + patient_id + '/' + record.filename).getDownloadURL()
      .then(e=>{
     return   this.db.firestore.collection('Lab-LOA').add({
          patient_id: patient_id,
          lab_id: lab_id,
          file: e,
          filename: record.filename,
          status: 'pending',
          createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
        })
      })
    })
  }
  check_LOA(ins_id,pat_id,nowDate)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id).collection('Insurance_LOA_Request')
    .where('patient_id','==',pat_id).where('createdAt','==',nowDate).get();
  }
  request_LOA(ins_id,pat_id,lab_id2)
  {
    return this.db.firestore.collection('Health_Insurance').doc(ins_id).collection('Insurance_LOA_Request')
    .add({
      patient_id: pat_id,
      createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
      lab_id: lab_id2,
      status: 'pending'
    })
  }
  get_patient_insurance(id)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info')
    .get();
  }
  pay_insurance(id,record)
  {
    return this.db.firestore.collection('Users').doc(id).collection('Insurance_Info').doc(record.id)
    .update(record);
  }
}

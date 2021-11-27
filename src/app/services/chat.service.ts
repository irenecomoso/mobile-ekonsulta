import * as firebase from 'firebase/app';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public db: AngularFirestore,public fireb: FirebaseApp) { }


    create_chat(doc_id,patient_id)
    {
      this.db.firestore.collection('Chats').add({
        createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
        patient_id: patient_id,
        doc_id: doc_id,
        messages: []
      })
    }

    send_message(chatid,content,uid)
    {

      const data ={
        uid,
        content,
        createdAt: formatDate(new Date(),'MM/dd/yyyy','en')
      }
    return this.db.firestore.collection('Chats').doc(chatid).update({
        messages: firebase.default.firestore.FieldValue.arrayUnion(data)
      })
    }


    check_chat(doc_id,patient_id)
    {
      return this.db.firestore.collection('Chats').where('doc_id','==',doc_id).where('patient_id','==',patient_id)
      .get();
    }

    get(chatId) {
      return this.db
        .collection<any>('Chats')
        .doc(chatId)
        .snapshotChanges();
    }
}

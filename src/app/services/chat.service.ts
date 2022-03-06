/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable one-var */
/* eslint-disable curly */
/* eslint-disable no-var */
import * as firebase from 'firebase/app';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public db: AngularFirestore,
    public fireb: FirebaseApp,
    public store: AngularFireStorage
    ) { }


    create_chat(doc_id,patient_id)
    {
      this.db.firestore.collection('Chats').add({
        createdAt: formatDate(new Date(),'MM/dd/yyyy','en'),
        patient_id: patient_id,
        doc_id: doc_id,
        messages: []
      })
    }

    send_message(chatid,record,uid)
    {
      var imageFile,content;
      if(record.imageFile == undefined || record.imageFile == null || record.imageFile == "")
        imageFile = "";
      else
        imageFile = record.imageFile;
      if(record.content == "" || record.content == undefined || record.content == null)
        content= ""
      else
        content = record.content;
      const data ={
        uid,
        content,
        imageFile,
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
    send_chat_image(record)
    {
      return this.store.ref('chat-image/' + record.filename).put(record.file)
      .then(()=>{
        return this.store.storage.ref('chat-image' + record.filename).getDownloadURL();
      })
    }
}

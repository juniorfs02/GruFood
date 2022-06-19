import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FireserviceService {
  collectionName = 'gru-food'

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}
  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data) {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  get_transactions(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  add_transaction(data){
    return this.firestore.collection(this.collectionName).add(data);
  }

  delete_transaction(id){
    return this.firestore.doc(this.collectionName + '/' + id).delete();
  }

  get_single_transaction(id){
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

  updateTransaction(id,data){
    return this.firestore.doc(this.collectionName + '/' + id).update(data);
  }
}


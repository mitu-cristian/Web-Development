import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // constructor(private afs: AngularFirestore) { }

  // // Add a student
  // addStudent(student: Student) {
  //   student.id = this.afs.createId();
  //   return this.afs.collection('/Students').add(student);
  // }

  // // Get all students
  // getAllStudents() {
  //   return this.afs.collection('/Students').snapshotChanges();
  // }

  // // Delete a student
  // deleteStudent(student: Student) {
  //   return this.afs.doc('/Students/' + student.id).delete();
  // }

  // // Update a student
  // updateStudent(student: Student) {
  //   this.deleteStudent(student);
  //   this.addStudent(student);
  // }
}

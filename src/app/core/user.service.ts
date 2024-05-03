import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collection = 'users'
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private _firestore: AngularFirestore,
  ) {
    // this.fetchUsers();
  }

  async fetchUsers() {

  }

  get users$(): Observable<any[]> {
    this._firestore.collection(this.collection).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User; // Specify the type using the interface
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(data => {
      this.usersSubject.next(data);
    });
    return this.usersSubject.asObservable();
  }



  create(data: User) {
    this._firestore.collection(this.collection).add({ ...data });
  }

  update(id: string, data: any) {
    this._firestore.collection(this.collection).doc(id).update(data);
  }

  get(id: string): Observable<any> {
    return this._firestore.collection(this.collection).doc(id).snapshotChanges()
      .pipe(
        map((doc) => {
          const data = doc.payload.data() as User;
          const id = doc.payload.id;
          return { id, ...data };
        })
      );
  }
}

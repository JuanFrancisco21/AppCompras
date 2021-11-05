import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService implements OnInit {
  public user: User | null = null;
  public ready: boolean = false;
  public $ready: Observable<any> | null = null;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,public authf: AngularFireAuth) { 
    this.checkSSO();
  }

  ngOnInit() {
  
  }

  public registroUsuario(userdata: { email: any; password: any; }): Promise<firebase.default.auth.UserCredential> {
    return this.authf.createUserWithEmailAndPassword(userdata.email, userdata.password);
  }
  public inicioSesion(userdata: { email: any; password: any; }): Promise<firebase.default.auth.UserCredential> {
    return this.authf.signInWithEmailAndPassword(userdata.email,userdata.password);
  }

  public googleLogin(): Promise<firebase.default.auth.UserCredential> {
    return this.authf.signInWithPopup(new GoogleAuthProvider())
  }

  public setUser(u: firebase.default.auth.UserCredential | any | null): void {
    if (u && u.user) {
      this.user = {
        displayName: u.user?.displayName,
        email: u.user?.email,
        photoURL: u.user?.photoURL,
        uid: u.user?.uid
      };
    } else {
      this.user = null;
    }
  }
  public checkSSO(): void {
    this.$ready = new Observable((observer) => {
      try {
        this.authf.authState.subscribe((data) => {
          this.ready = true;
          if (data!=null) {
            this.setUser({ user: data });
            observer.next(true);
          } else {
            this.setUser(null);
            observer.next(false);
          }
          observer.complete();
        });
      } catch (error) {
        console.log(error);
        this.setUser(null);
        this.ready = true;
        observer.next(false);
        observer.complete();
      }
    })

  }
  public get isLogged(): boolean {
    return this.user ? true : false;
  }
  public logout(): Promise<void> {
    return new Promise(async(resolve, reject) => {
      if (this.isLogged) {
        try {
          await this.authf.signOut();
          this.setUser(null);
          resolve();
        } catch (error) {
          reject(error);
        }
        
      }
    });

  }

}


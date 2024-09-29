import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { ApiService } from '../api.service';
import { environmentLocal } from 'src/environment';
import { User } from '../models/user';
import { Mapper } from './mapper';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private displayNameSubject = new BehaviorSubject<string>(this.updateDisplayName());
  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  signUpWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    localStorage.removeItem('authValidUntil');
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    localStorage.removeItem('displayName');
    localStorage.removeItem('token');
    return this.afAuth.signOut();
  }
  verifyAuth() {
    const token = JSON.parse(localStorage.getItem('auth'))?.user.token;
    if (token) {
      this.setAuthentication(token);
      this.getRequest('user/checkAccess').subscribe({
        next:it => {
          const validity = localStorage.getItem('authValidUntil');
          if (new Date(validity)  <= new Date()) {
          }
        }, error: it => {
          this.logout();
          window.location.reload();
        }
      });
    }
    return localStorage.getItem('auth');
  }
  // Observable to get the latest display name
  get displayName$() {
    return this.displayNameSubject.asObservable();
  }
  updateDisplayName() {
    let userMapper = new Mapper<User, User>((user: User): User => {
      return user;
    })
    let authUser = localStorage.getItem('auth');
    if (authUser) {
      let user = userMapper.map(JSON.parse(authUser).user);
      if (this.displayNameSubject && !localStorage.getItem('displayName')) {
        let displayName = '';
        if(user?.isGoogleAccount) {
          displayName =  user.user_google.displayName.toString();
        }
        if(user?.isFacebookAccount) {

        }
        if(!user?.isGoogleAccount && !user?.isFacebookAccount) {
          displayName = user.name;
        }
        this.displayNameSubject.next(displayName);
        localStorage.setItem('displayName', displayName)
      } 
    }
    return '';
  }
  get displayName() {
    return localStorage.getItem('displayName');
  }
  setAuth(data: any) {
    localStorage.setItem('auth', JSON.stringify(data));
    localStorage.setItem('token', data?.user?.token);
  }
  logInDefault(payload) {
    return this.postRequest('user/login', payload);
  }
  registerGoogleUser(payload) {
    return this.postRequest('user/create', payload);
  }
  registerDefault(payload) {
    return this.postRequest('user/create', payload);
  }
  loginGoogleUser(payload) {
    return this.postRequest('user/loginViaGoogle', payload);
  }
  registerFacebookUser(payload) {
    return this.postRequest('user/create', payload);
  }
  loginFacebookUser(payload) {
    return this.postRequest('user/loginViaFacebook', payload);
  }
}

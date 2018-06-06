import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//versi lama import firebase
//import firebase from firebase;
//versi baru
import firebase from 'firebase/app'; //untuk mendefinisi firebase namespace 
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './credentials';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
   //menginisialisasi firebase
   firebase.initializeApp(firebaseConfig);
  // cek apakah user sudah terauthentifikasi atau belum
   const unsubscribe = firebase.auth()
    .onAuthStateChanged(user =>{
      if (!user) { //belum terauthentifikasi
        this.rootPage ='LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage; // tidak pakai petik karena sudah di impor diatas
        unsubscribe();
      }


    }); //boleh tanpa titik koma jika tidak ada perintah lagi 
  }
}


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, AlertController } from 'ionic-angular';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  //global variable
  public resetPasswordForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    // cek validasi form
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ]
    });


  }

  //proses reset password
  resetPassword(): void {
    //cek form sudah valid atau belum
    if (!this.resetPasswordForm.valid) {
      console.log(`Form belum valid : ${this.resetPasswordForm.value}`);
    } else {
      const email: string = this.resetPasswordForm.value.email;
      // baca dari firebae
      this.authProvider.resetPassword(email).then(user => { //resolve
        const myAlert: Alert = this.alertCtrl.create({
          message: 'Cek email untuk reset password',
          buttons: [{
            text: 'Yes',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        });
        myAlert.present();

      },
        error => { //reject
          const errorAlert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          errorAlert.present();

        });

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}

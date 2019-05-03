import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

/**
 * Controlador utilizado para creación y edición de usuarios
 */

@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  user = {};
  users: any[] = [];
  from = "";
  error = "";
  index = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {

    //Si recibe arreglo de usuarios, se asigna al arreglo local
    if (this.navParams.data.users) {
      this.users = this.navParams.data.users;
    }

    //Si recibe objeto usuario, se asigna al objeto local
    if (this.navParams.data.user) {
      this.user = this.navParams.data.user;
    }

    //Si recibe int index, se asigna a la variable local
    if (this.navParams.data.index) {
      this.index = this.navParams.data.index;
    }

    //Si recibe string from, se asigna a la variable local
    if (this.navParams.data.from) {
      this.from = this.navParams.data.from;
    }
  }

  /**
   * Metodo para guardar o editar usuario segun caso
   */
  saveUser() {
    if (this.user['name'].length > 10 && this.user['rut'].length == 10) {
      if (this.from == "create") {
        this.users.push(this.user);
        this.storage.set('users', JSON.stringify(this.users));
      } else if (this.from == "edit") {
        this.users[this.index] = this.user;
        this.storage.set('users', JSON.stringify(this.users));
      }
      this.error = "";
      this.navCtrl.pop();
    }
    else if (this.user['name'].length < 10) this.error = "El nombre debe contener al menos 10 caracteres";

    else if (this.user['rut'].length < 10 || this.user['rut'].length > 10) this.error = "El rut debe tener 10 caracteres";

  }

}

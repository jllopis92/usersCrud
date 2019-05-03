import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {NewUserPage} from "../new-user/new-user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storage: Storage) {

  }

  ionViewDidLoad() {
    this.getAllUsers();
  }

  /**
   * Función para cargar usuarios guardados en memoria interna
   */
  getAllUsers() {
    this.storage.get('users').then(async (val) => {
      if (val) this.users = JSON.parse(val);
      console.log('users' + this.users);
    });
  }

  /**
   * Borrar usuario de arreglo y memoria
   * @param user: usuario a eliminar
   * @param index: indice de usuario en arreglo
   */
  deleteUser(user: any, index) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Desea eliminar el usuario ' + user.name,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log("data ", data)
            this.users.splice(index, 1);
            console.log("users ", this.users)
            this.storage.set('users', JSON.stringify(this.users));
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Método para editar usuario, se levanta vista de crear/editar y se envian parametros respectivos
   * @param user: usuario a editar
   * @param index: indice de usuario en arreglo
   */
  updateUser(user, index) {
    this.navCtrl.push(NewUserPage, {
      users: this.users,
      user: this.users[index],
      index: index,
      from: "edit"
    });
  }


  /**
   * Método para crear usuario, se levanta vista de crear/editar y se envian parametros respectivos
   */
  createUser() {
    this.navCtrl.push(NewUserPage, {
      users: this.users,
      from: "create"
    });
  }
}

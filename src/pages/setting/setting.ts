import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  sqlstorage: SQLite;

  constructor(public navCtrl: NavController, plt: Platform) {
    plt.ready().then((readySource)=> {
      this.sqlstorage = new SQLite();
      this.sqlstorage.create({ name: 'data.db', location: 'default'})
      .then((sqlobject: SQLiteObject) => {
        sqlobject.executeSql('CREATE TABLE IF NOT EXISTS workouts ( date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, pushup SMALLINT DEFAULT(0), situp SMALLINT DEFAULT(0), squat SMALLINT DEFAULT(0))', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log("Error executing sql query", e));
      })
      .catch(e => console.log("Error opening database", e));
    });
  }

  clear_database() {
    this.sqlstorage.create({ name: 'data.db', location: 'default'})
    .then((sqlobject: SQLiteObject) => {
      let q = "DROP TABLE workouts";
      sqlobject.executeSql(q, {})
      .then(() => console.log("Deleted database!"))
      .catch(e => console.log("Error executing sql query", e));
    })
    .catch(e => console.log("Error opening database", e));
  }

}

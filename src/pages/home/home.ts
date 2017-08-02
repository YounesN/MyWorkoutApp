import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushup: number;
  situp: number;
  squat: number;
  sqlstorage: any = null;

  constructor(public navCtrl: NavController) {
    this.sqlstorage = new SQLite();
    this.sqlstorage.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS workouts(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, date datetime NOT NULL DEFAULT GETDATE(), pushup SMALLINT DEFAULT(0), situp SMALLINT DEFAULT(0), squat SMALLINT DEFAULT(0))', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  addWorkout()
  {
    let q = "INSERT INTO workouts(pushup, situp, squat) VALUES (" + this.pushup + ", " + this.situp + ", " + this.squat + ")";
    console.log(q);
    this.sqlstorage.executeSql(q);
  }
}

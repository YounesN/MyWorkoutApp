import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushup: number;
  situp: number;
  squat: number;
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

  addWorkout()
  {
    this.sqlstorage.create({ name: 'data.db', location: 'default'})
    .then((sqlobject: SQLiteObject) => {
      let q = "INSERT INTO workouts(pushup, situp, squat) VALUES (" + this.pushup + ", " + this.situp + ", " + this.squat + ")";
      sqlobject.executeSql(q, {})
      .then((data) => console.log("INSERTED: " + JSON.stringify(data)))
      .catch(e => console.log("Error executing sql query", e));
    })
    .catch(e => console.log("Error opening database", e));
  }
}

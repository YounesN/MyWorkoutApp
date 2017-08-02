import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  sqlstorage: SQLite;
  workouts: Array<Object>;

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

    //this.refresh();
  }

  refresh() {
    this.sqlstorage.create({ name: 'data.db', location: 'default'})
    .then((sqlobject: SQLiteObject) => {
      let q = "SELECT datetime(date, 'localtime') AS date, pushup, situp, squat FROM workouts";
      sqlobject.executeSql(q, {})
      .then((data) => {
        this.workouts = [];
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            this.workouts.push({date: data.rows.item(i).date,
                                pushup: data.rows.item(i).pushup,
                                situp: data.rows.item(i).situp,
                                squat: data.rows.item(i).squat
            });
          }
        }
      })
      .catch(e => console.log("Error executing sql query", e));
    })
    .catch(e => console.log("Error opening database", e));
  }
}

const moment = require('moment');
moment().format();

module.exports = (db) => {
  return {
    create: (data, callback) => {
      // parse date and time together
      let alert_time = moment(data[0].date + " " + data[0].time, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD HH:mm:ss");
      // console.log(alert_time);
      // write to postgres
      db.query(`insert into alerts (user_id, name, description, type, alert_time, created_at, updated_at) values (${data[1]}, '${data[0].name}', '${data[0].description}', 'alert', '${alert_time}', now(), now());`, (err, res) => {
        console.log(res.rowCount);
        if (err) console.error("insert alert into db err", err.stack);
        if (res.rowCount === 1) {
          callback(true);
        } else {
          callback(false);
        }
      })
    },
    getAlertbyId: (id, callback) => {
      db.query(`select id, name, description, type, TO_CHAR(alert_time, 'DY, DD MON YYYY at HH:MI AM') as display_time, alert_time, TO_CHAR(alert_time, 'YYYY-MM-DD') as raw_date, TO_CHAR(alert_time, 'HH24:MI') as raw_time, user_id from alerts where id=${id}`, (err, res) => {
        if (err) {
          console.error("error fetching alert from db", err.stack);
          callback(false);
        } else {
          if (res.rowCount === 1) {
            callback(res.rows[0]);
          } else {
            callback(false);
          }
        }

      })
    },
    edit: (data, callback) => {
      let alert_time = moment(data.date + " " + data.time, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD HH:mm:ss");
      // write to postgres
      db.query(`update alerts set name='${data.name}', description='${data.description}', alert_time='${alert_time}', updated_at='now()' where id=${data.id};`, (err, res) => {
        // console.log(res.rowCount);
        if (err) console.error("update alert into db err", err.stack, err.message);
        if (res.rowCount === 1) {
          callback(true);
        } else {
          callback(false);
        }
      })
    },
    remove: (id, callback) => {
        db.query(`delete from alerts where id=${id};`, (err, res) => {
          if (err) console.error("delete alert error", err.stack);
          if (res.rowCount === 1) {
            callback(true);
          } else {
            callback(false);
          }
        })
    }
  }
}

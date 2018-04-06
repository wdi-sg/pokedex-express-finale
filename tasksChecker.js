// interval

// let counter = 1;
// var myVar = setInterval(() => {
//   console.log("counter", counter);
//   counter++;
// }, 1000);

const db = require("./db");
const telegram = require("./telegram");

const checkTasks = (callback) => {
  let tasks = [];
  db.pool.query("select id, user_id, name, description, alert_time from alerts where is_expired=FALSE", (err, res) => {
      if (err) {
        console.log("alert checker cannot get data", err.stack);
      } else {
        if (res.rowCount > 0) {
          for (i=0; i<res.rowCount; i++) {
            // check is alert is expired
            if (new Date() > res.rows[i].alert_time) {
              let task = {
                id: res.rows[i].id,
                user_id: res.rows[i].user_id,
                name: res.rows[i].name,
                description: res.rows[i].description
              };
              tasks.push(task);
            }
          }
        }
        // telegram.bot.sendMessage(230760550, `TEST`);
      }
      // console.log(tasks);
      callback(tasks);
    })
}

const getTelegramById = (id, callback) => {
  db.pool.query(`select telegram_id from users where id='${id}'`, (err, res) => {
    let telegramId;
    if (err) {
      console.error("error fetching telegram_id", err.stack);
    } else {
      if (res.rowCount === 1) {
        telegramId = res.rows[0].telegram_id;
      }
    }
    callback(telegramId);
  })
}

const messageUser = (data, callback) => {
  let message = "_"+ data[1].name + "_\n\n*" + data[1].description + "*";
  telegram.bot.sendMessage(data[0], message, {
    parseMode: "Markdown"
  });
}

const updateTask = (id) => {
  db.pool.query(`update alerts set is_expired=TRUE where id=${id}`, (err, res) => {
    if (err) console.error("error expiring alert", err.stack);
  });
}
module.exports = {
  checkTasks,
  getTelegramById,
  messageUser,
  updateTask
}

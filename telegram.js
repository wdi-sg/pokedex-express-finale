require('dotenv').config()
const telegram_token = process.env.telegram_token; // Mominder_robot
const TeleBot = require('telebot');
const db = require("./db");

bot = new TeleBot(telegram_token);
bot.on(['/start'], (msg) => {

  db.pool.query(`select * from users where telegram_id=${msg.from.id}`, (err, res) => {
    if (res.rowCount === 0) {
      msg.reply.text(`${msg.from.first_name}, you are new here! Please enter your email address to link your telegram account to Mominder App.`);
    } else {
      msg.reply.text(`Your telegram is already linked to an exisiting Mominder account.`);
    }
  })

  console.log("reply_to_message", msg.reply_to_message);
  console.log("sender_id", msg.from.id);
  console.log("sender_id", msg.text);
});

bot.on(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, (msg) => {
  db.pool.query(`select telegram_id from users where email='${msg.text}'`, (err, res) => {
    if (err) console.error("error", err.stack);
    console.log("@@@", msg.from.id, msg.text, res.rows);
    if (res.rowCount === 1 && res.rows[0].telegram_id == null) {
      db.pool.query(`update users set telegram_id='${msg.from.id}' where email='${msg.text}'`, (err2, res2) => {
        console.error("error inserting telegram_id", err2);
        console.log(res2);
        if (res2.rowCount > 0) {
          bot.sendMessage(msg.from.id, `${msg.text} linked`);
        } else {
          bot.sendMessage(msg.from.id, `something went wrong`);
        }
      })
    } else if (res.rowCount == 0) {
      bot.sendMessage(msg.from.id, `${msg.text} not found in Mominder.`);
    } else if (res.rowCount === 1 && res.rows[0].telegram_id != null) {
      bot.sendMessage(msg.from.id, `${msg.text} is already linked to a Mominder account.`);
    }
  })
});

// inline button version
// bot.on(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, (msg) => {
//   db.pool.query(`select * from users where telegram_id=${msg.from.id}`, (err, res) => {
//     if (res.rowCount === 0) {
//       let replyMarkup = bot.inlineKeyboard([
//           [
//               bot.inlineButton('YES', {callback: 'yes'}),
//               bot.inlineButton('NO', {callback: 'no'})
//           ]
//       ]);
//       bot.sendMessage(msg.from.id, `You have entered ${msg.text} Is this correct?`, {replyMarkup});
//     }
//   })
// });
//
// // Inline button callback
// bot.on('callbackQuery', msg => {
//     // User message alert
//     console.log(msg);
// });


bot.start();


module.exports = {
  bot
}

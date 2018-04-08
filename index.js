/**
* Entry point to Express web server.
*
* Import external library modules as needed (eg. body-parser, etc).
*/

const express = require('express');
const handlebars = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./db');
const telegram = require('./telegram');
const tasksChecker = require('./tasksChecker');
require('dotenv').config()

/**
* ===================================
* Configurations and set up
* ===================================
*/

// bot.sendMessage(230760550, "hello mom");

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));
app.use(cookieParser());

// Initialize Passport and restore authentication state, if any, from the
// session.
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// static file
app.use(express.static('public'));

// Express Session
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    pool : db.pool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
  }),
  secret: 'my_sercet_key',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// checks for interval
setInterval(() => {
  tasksChecker.checkTasks(tasks => {
    // console.log(tasks);
    if (tasks.length > 0){
      for (i=0; i<tasks.length; i++) {
        let tempId = i;
        let temp = (tasks[i].user_id);
        // get telegram id by user_id
        tasksChecker.getTelegramById((temp), (telegramId) => {
          // console.log(telegramId);
          if (telegramId != null) {
            // console.log(tasks, tempId);
            tasksChecker.messageUser([telegramId, tasks[tempId]], (results) => {
              console.log(results);
            })
          }
        });
        tasksChecker.updateTask(tasks[tempId].id);
      }
    }
  });
}, 30000);

/**
* ===================================
* Routes
* ===================================
*/

// Import routes to match incoming requests
require('./routes')(app, db, passport);

/**
* ===================================
* Listen to requests on port 3000
* ===================================
*/

const server = app.listen(process.env.PORT || 3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  // close database connection pool
  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });

});

server.on( "SIGINT", function() {
    console.log( "got SIGINT" );
    server.close();
});

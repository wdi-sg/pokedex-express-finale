const task = require("../tasksChecker");

const createForm = (req, res) => {
  // check if telegram is linked
  task.getTelegramById(req.user.id, (queryRes) => {
    if (queryRes == null) {
      req.flash("error_msg", "telegram not linked");
      res.redirect("/users/telegram");
    } else {
      res.render("alert/create");
    }
  })
}

const create = (db) => {
  return (req, res) => {
    db.alerts.create([req.body, req.user.id], (queryRes) => {
      if (queryRes) {
        req.flash("success_msg", "Alert created");
      } else {
        req.flash("error_msg", "Alert creation error");
      }
      res.redirect("/");
    })
  }
}

const getAlert = (db) => {
  return (req, res) => {
    db.alerts.getAlertbyId((req.params.id), (queryRes) => {
      if (queryRes === false || queryRes.user_id != req.user.id) {
        res.redirect("/");
      } else {
        res.render("alert/view", {alert: queryRes});
      }
    });
  }
}

const editForm = (db) => {
  return (req, res) => {
    db.alerts.getAlertbyId((req.params.id), (queryRes) => {
      res.render("alert/edit", {alert: queryRes});
    });
  }
}

const edit = (db) => {
  return (req, res) => {
    db.alerts.edit(req.body, (queryRes) => {
      if (queryRes) {
        req.flash("success_msg", "edit made");
      } else {
        req.flash("error_msg", "edit error");
      }
      res.redirect(`/alerts/${req.body.id}`);
    })
  };
}

const remove = (db) => {
  return (req, res) => {
    db.alerts.remove(req.params.id, (queryRes) => {
      if (queryRes) {
        req.flash("success_msg", "alert deleted");
      } else {
        req.flash("error_msg", "delete error");
      }
      res.redirect(`/`);
    })
  }
}

const cryptoForm = (req, res) => {
  res.render("alert/crypto");
}

module.exports = {
  createForm,
  create,
  getAlert,
  editForm,
  edit,
  remove,
  cryptoForm
}

const createUserRouter = db => {
    const express = require('express');
    const router = express.Router();
    // users controller
    const uc = require("../controllers/user.js")(db);

    // New User handler
    router.get('/new', uc.showCreationForm);

    // Database handler (CRUD)
    router.post('/', uc.userCreate);

    return router;
}

// export router to be used in app.js
module.exports = createUserRouter;
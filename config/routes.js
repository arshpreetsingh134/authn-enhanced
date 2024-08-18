const express = require("express");
const router = express.Router();

// app.get("/", (req, res) => {
//   res.send("Hello Universe!");
// });

// Controllers
const pages = new (require("../app/controllers/pages"))();
const auth = new (require("../app/controllers/auth.js"))();
const admin = new (require("../app/controllers/admin.js"))();

// Call the 'welcome' action from the PagesController
router.get("/", pages.welcome, admin.dashboard);

router.get("/login", auth.login);

router.get("/register", auth.register);

module.exports = router;

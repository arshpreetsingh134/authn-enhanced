const express = require("express");
const router = express.Router();

// Passport
const PassportService = require("../app/services/passport-service");
const SessionChallengeStore =
  require("passport-fido2-webauthn").SessionChallengeStore;

const passportService = new PassportService();
const store = new SessionChallengeStore();

passportService.init(store);

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

// router.post("/register/public-key/challenge", auth.createChallengeForm(store));

module.exports = router;

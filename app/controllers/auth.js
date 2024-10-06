// const base64Url = require("base64Url");
// const uuid = require("uuid").v4;

class AuthController {
  login(req, res) {
    res.render("auth/login");
  }

  register(req, res) {
    res.render("auth/register");
  }

  // createChallengeForm(store) {
  //   return (req, res, next) => {
  //     const user = {
  //       id: uuid({}, Buffer.alloc(16)),
  //       name: req.body.email,
  //     };

  //     store.challenge(req, { user: user }, (err, challenge) => {
  //       if (err) return next(err);

  //       user.id = base64Url.encode(user.id);

  //       res.json({
  //         user: user,
  //         challenge: base64Url.encode(challenge),
  //       });
  //     });
  //   };
  // }
}

module.exports = AuthController;

const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  adminLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
// const { SECRET,PASSWORD } = require("../config");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require("express-validator");

// Users Registeration Route
router.post(
  "/register-user",
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  [
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Fullname can not be empty")
      .isLength({
        min: 3,
      }),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Enter a valid email"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username can not be empty")
      .isLength({
        min: 3,
      }),
    check("mobile")
      .trim()

      .isDecimal()

      .withMessage("Must be a  number"),
    check("password", "The password must be 5+ chars long and contain a number")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("Do not use a common word as the password")
      .isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty()
      .withMessage("address can not be null")
      .isLength({
        min: 3,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorResponse = errors.array({ onlyFirstError: true });
      return res.status(422).json({ message: errorResponse[0] });
    }

    await userRegister(req.body, "user", res);
  }
);

// Admin Registration Route
router.post(
  "/register-admin",
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  [
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Fullname can not be empty")
      .isLength({
        min: 3,
      }),
    check("EducationLevel")
      .not()
      .isEmpty()
      .withMessage("Education Level can not be empty")
      .isLength({
        min: 3,
      }),
    check("eductioninstitute")
      .not()
      .isEmpty()
      .withMessage("Eduction Institute can not be empty")
      .isLength({
        min: 3,
      }),
    check("DepertmentName")
      .not()
      .isEmpty()
      .withMessage("Depertment Name can not be empty")
      .isLength({
        min: 3,
      }),
    check("Address")
      .not()
      .isEmpty()
      .withMessage("Address can not be empty")
      .isLength({
        min: 3,
      }),
    check("Mobile")
      .not()
      .isEmpty()
      .withMessage("Mobile Number can not be empty")
      .isLength({
        min: 3,
      }),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Enter a valid email"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Adminname can not be empty")
      .isLength({
        min: 3,
      }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 8 })
      .withMessage("Password minimum eight characters, at least one letter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorResponse = errors.array({ onlyFirstError: true });
      return res.status(422).json({ message: errorResponse[0] });
    }
    await userRegister(req.body, "admin", res);
  }
);

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await adminLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  const user = await User.find({ _id: req.user.user_id });

  return res.json(user);
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user", "admin", "superadmin"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin", "superadmin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

router.get("/active/:activeToken", function (req, res, next) {
  // find the corresponding user
  User.findOne(
    {
      activeToken: req.params.activeToken,

      // check if the expire time > the current time       activeExpires: {$gt: Date.now()}
    },
    function (err, user) {
      console.log(user);
      if (err) return next(err);

      // invalid activation code
      if (!user) {
        return res.render("message", {
          title: "fail to activate",
          content:
            'Your activation link is invalid, please <a href="/account/signup">register</a> again',
        });
      }
      user.confirmed = true;
      user.save().then((ok) => {
        res.redirect(`${process.env.frontend_route}/userlogin`);
      });
    }
  );
});

router.post("/forgotpassordorusername", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) {
    return res.status(404).json({
      message: "Email not found. Invalid login credentials.",
      success: false,
    });
  }

  let forgetpasswordToken = jwt.sign(
    {
      email: req.body.email,
    },
    process.env.SECRET,
    { expiresIn: "1 days" }
  );
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tenminuteversity@gmail.com",
        pass: "yabkkwxtatzbaihd",
      },
    });

    var link = `${process.env.Call_Back}/forgotpasswordform/${forgetpasswordToken}`;
    let username = emailExist.username;
    var mailOptions = {
      from: "tenminuteversity@gmail.com",
      to: req.body.email,
      subject: "Welcome",
      html: `<h1>Your user name is: ${username} </h1>
    </br>
    Please  <a href="${link}">click here </a> to reset your password.`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        await emailExist.updateOne({ activeToken: forgetpasswordToken });

        if (info) {
          res.json({ success: true });
        }
      }
    });
  } catch (error) {
    res.send(error);
  }
});
router.post(
  "/subforgotpasswordforms/:forgotpasswordtoken",
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  [
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 8 })
      .withMessage("Password minimum eight characters, at least one letter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorResponse = errors.array({ onlyFirstError: true });
      res.status(422).json({ message: errorResponse[0] });
    }
    await User.findOne({ activeToken: req.params.forgotpasswordtoken })
      .then(async (user) => {
        const password = await bcrypt.hash(req.body.password, 12);
        user.password = password;
        user.confirmed = true;
        await user
          .save()
          .then((data) => {
            res.json({ success: true });
          })
          .catch((err) => {
            res.status(400).json({
              message: { msg: `Somthing error happend again` },
              success: false,
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          message: { msg: `Somthing error happend try again` },
          success: false,
        });
      });
  }
);
router.get("/getalluser", userAuth, checkRole(["admin"]), async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
router.get(
  "/getallwritter",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.find({ writterconfirmed: true });
    res.send(users);
  }
);
router.get(
  "/getallwritteraplicant",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.find({ writterconfirmed: false });
    res.send(users);
  }
);

router.get(
  "/deleteuser/:id",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    // console.log(req.params.id);
    User.deleteOne({ _id: req.params.id })
      .then((data) => {
        return res.status(200).json({
          messege: {
            msg: "deleted",
            success: true,
          },
        });
      })
      .catch((err) => {
        return res.status(400).json({
          messege: {
            msg: "unable to deleted",
            success: false,
          },
        });
      });
  }
);

router.post(
  "/deletewritterapplicant",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.deleteOne({ _id: req.body.id });
    res.send(users);
  }
);
router.post(
  "/deletewritter",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.deleteOne({ _id: req.body.id });
    res.send(users);
  }
);

router.post(
  "/writterapplicant_to_writter",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.updateOne(
      { _id: req.body.id },
      { $set: { writterconfirmed: true } }
    );
    res.send(users);
  }
);
router.post(
  "/change_to_user",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const users = await User.updateOne(
      { _id: req.body.id },
      { $set: { writterconfirmed: false } }
    );
    res.send(users);
  }
);

// cart route
router.get("/addToCart", userAuth, checkRole(["user", "admin"]), (req, res) => {
  User.findOne({ _id: req.user.user_id }, (err, userInfo) => {
    if (req.query.type == "add") {
      let duplicate = false;

      if (userInfo.cart.length) {
        userInfo.cart.forEach((item) => {
          if (item.id == req.query.productId) {
            duplicate = true;
          }
        });
      }

      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user.user_id, "cart.id": req.query.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.cart);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user.user_id },
          {
            $push: {
              cart: {
                id: req.query.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.cart);
          }
        );
      }
    } else {
      if (userInfo.cart.length) {
        userInfo.cart.forEach((item) => {
          if (item.id == req.query.productId && item.quantity === 1) {
            User.updateOne(
              { _id: req.user.user_id },
              {
                $pull: { cart: { id: req.query.productId } },
              }
            ).then((item) => {
              return res.json({
                success: true,
                mesege: "total deleted korte hbe",
              });
            });
          } else if (item.id == req.query.productId && item.quantity > 1) {
            User.findOneAndUpdate(
              { _id: req.user.user_id, "cart.id": req.query.productId },
              { $inc: { "cart.$.quantity": -1 } },
              { new: true },
              (err, userInfo) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json(userInfo.cart);
              }
            );
          }
        });
      }
    }
  });
});

router.get("/addToWish", userAuth, checkRole(["user", "admin"]), (req, res) => {
  console.log("wish list click");

  User.findOne({ _id: req.user.user_id }, (err, userInfo) => {
    if (req.query.type == "add") {
      console.log("sub");
      let duplicate = false;

      if (userInfo.wishlist.length) {
        userInfo.wishlist.forEach((item) => {
          if (item.id == req.query.productId) {
            duplicate = true;
          }
        });
      }

      if (duplicate) {
        return res.json({
          success: false,
          msg: "Already in Your Wishlist",
          duplicate: true,
        });
      } else {
        console.log("not duplicate");
        User.findOneAndUpdate(
          { _id: req.user.user_id },
          {
            $push: {
              wishlist: {
                id: req.query.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.wishlist);
          }
        );
      }
    } else {
      console.log("sub");
      if (userInfo.wishlist.length) {
        userInfo.wishlist.forEach((item) => {
          if (item.id == req.query.productId && item.quantity === 1) {
            User.updateOne(
              { _id: req.user.user_id },
              {
                $pull: { wishlist: { id: req.query.productId } },
              }
            ).then((item) => {
              return res.json({
                success: true,
                mesege: "total deleted korte hbe",
              });
            });
          } else if (item.id == req.query.productId && item.quantity > 1) {
            User.findOneAndUpdate(
              { _id: req.user.user_id, "wishlist.id": req.query.productId },
              { $inc: { "wishlist.$.quantity": -1 } },
              { new: true },
              (err, userInfo) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json(userInfo.wishlist);
              }
            );
          }
        });
      }
    }
  });
});

router.get(
  "/removeFromCart",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    await User.updateOne(
      { _id: req.user.user_id },
      {
        $pull: { cart: { id: req.query.productId } },
      }
    ).then((item) => {
      return res.json({
        success: true,
        mesege: "deleted",
      });
    });
  }
);

router.get(
  "/removeFromWish",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    await User.updateOne(
      { _id: req.user.user_id },
      {
        $pull: { wishlist: { id: req.query.productId } },
      }
    ).then((item) => {
      return res.json({
        success: true,
        mesege: "deleted",
      });
    });
  }
);

router.post(
  "/contactmessege",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let singleerror = errors.array();

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.json({
        messege: { msg: singleerror[0].msg, success: false },
      });
    }

    const send = require("gmail-send")({
      user: process.env.Mailstore,
      pass: process.env.pass,
      to: "buyforestclub@gmail.com",
      subject: req.body.fullname,
    });

    send(
      {
        text: req.body.message,
      },
      async (error, result, fullResult) => {
        if (error) {
          console.log(error);
          return res.json({
            messege: {
              msg: "gmail sent problem",
              success: false,
            },
          });
        } else {
          console.log("email send");
          return res.json({
            messege: {
              msg: "Messege send succesfully",
              success: true,
            },
          });
        }
      }
    );
  }
);
module.exports = router;

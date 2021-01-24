const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Order } = require("../model/Orders");
const { userAuth, checkRole } = require("../utils/Auth");
const User = require("../model/User");
router.post(
  "/ordersave",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    const order = await new Order({
      userid: req.user.user_id,
      orderid: req.body.paymentid,
      paymentid: req.body.paymentid,
      products: req.body.products,
      address: req.body.address,
      total: req.body.total,
      orderstatus: "1",
      paymentmethod: req.body.paymenttype,
      dateofpurcashe: Date.now(),
    });

    order
      .save()
      .then((respo) => {
        User.findOneAndUpdate(
          { _id: req.user.user_id },
          { $set: { cart: [] } },
          { new: true },
          (err, user) => {
            if (err) return res.json({ success: false, err });
          }
        );
        res.send(respo);
      })
      .catch((err) => {
        console.log("errror", err);
        res.send(err);
      });
  }
);
router.get(
  "/getuserorder",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    const order = await Order.find({ userid: req.user.user_id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);
router.get("/getsingleorder", async (req, res) => {
  console.log(req.query.orderid);
  const data = await Order.find({ orderid: req.query.orderid })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/getallorder", async (req, res) => {
  console.log(req.query.orderid);
  const data = await Order.find({})
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/uniqueid", (req, res) => {
  function getNumber(callback) {
    var n = Math.floor(Math.random() * 10000);
    Order.findOne(
      { $and: [{ orderid: n }, { paymentid: n }] },
      function (err, result) {
        if (err) callback(err);
        else if (result) return getNumber(callback);
        else callback(null, n);
      }
    );
  }

  getNumber(function (error, number) {
    if (number) {
      return res.json(number);
    }
  });
});

router.get("/deleteorders/:id", async (req, res) => {
  // console.log(req.params.id);
  Order.deleteOne({ _id: req.params.id })
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
});

router.post("/statusset", async (req, res) => {
  Order.findOne({ _id: req.body.id }).then((info) => {
    if (info) {
      console.log(info);

      info.orderstatus = req.body.status;

      info
        .save()
        .then((data) => {
          console.log("ff", data);
          res.json({
            data: data,
            success: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
module.exports = router;

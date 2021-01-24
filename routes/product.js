const express = require("express");
const router = express.Router();
const { Product } = require("../model/Product");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", (req, res) => {
  //save all the data we got from the client into the DB
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);
  console.log(term);

  if (term) {
    await Product.find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({
          success: true,
          products,
          postSize: parseInt(products.length),
        });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  // console.log("req.query.id", req.query.id)

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  // console.log("productIds", productIds)

  //we need to find the product information that belong to product Id
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

router.get("/getcategoryproduct", async (req, res) => {
  console.log(req.query.category);
  const data = await Product.find({
    $or: [
      { category: req.query.category },
      { subcategory: req.query.category },
    ],
  });
  if (data) {
    res.send(data);
  }
});

router.get("/deleteproduct/:id", async (req, res) => {
  // console.log(req.params.id);
  Product.deleteOne({ _id: req.params.id })
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

router.post("/updateproduct", async (req, res) => {
  console.log(req.body);
  Product.findOne({ _id: req.body.updatableid }).then((info) => {
    if (info) {
      console.log(info);

      info.title = req.body.title;
      info.skunumber = req.body.skunumber;
      info.description = req.body.description;
      info.price = req.body.price;
      info.quantity = req.body.quantity;
      info.weaight = req.body.weaight;
      info.category = req.body.category;
      info.subcategory = req.body.subcategory;
      info.brand = req.body.brand;
      info.discount = req.body.discount;
      info.stock = req.body.stock;
      info.shippingdetails = req.body.shippingdetails;
      info.manufacturesdetails = req.body.manufacturesdetails;
      info.selectedsize = req.body.selectedsize;
      info.feature = req.body.feature;
      info.trend = req.body.trend;
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

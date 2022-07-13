const router = require('express').Router();
const Product = require('../models/Product.model');
const { checkAdmin } = require('../middleware/roles.middleware');
const Cart = require('../models/Cart.model');

router.get('/products', checkAdmin, (req, res, next) => {
  res.render('make-product');
});

router.post('/products', checkAdmin, (req, res, next) => {
  const { image, name, price, rating } = req.body;

  Product.create({
    image,
    name,
    price,
    rating,
  })
    .then((product) => {
      console.log(product);

      res.redirect('/shopAll');
    })
    .catch((err) => console.log(err));
});

router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      console.log(product);
      res.render('product-details', product);
    })
    .catch((err) => console.log(err));
});
// careful naming these, they cant be the same, if you want to use calculators for both you must use .hbs on the render
router.get('/shopAll', (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render('shopAll.hbs', { products: products });
    })
    .catch((err) => console.log(err));
});
router.get('/cart', (req, res, next) => {
  console.log(req.session);

  // if (!req.session.myCart) {
  //   res.render('cart.hbs');
  // } else {
  //   req.session.total = 0;
  //   console.log(req.session);
  //   req.session.myCart.forEach((cartItem) => {
  //     req.session.total = req.session.total += cartItem.price;
  //   });
  //   console.log(req.session.total);
  //   console.log(req.session, 'yo2');
  //   res.render('cart.hbs', { cartItems: req.session });
  // }
  if (!req.session.myCart) {
    res.render('cartview.hbs');
  } else {
    Product.find({ _id: { $in: req.session.myCart._id } })
      .then((response) => {
        // console.log(allImages);
        let i = 0;
        let total = 0;
        console.log(response, ' si');

        for (let j = 1; j < response.length; i++) {
          if (response[i] === response[j]) {
            response[i] = response[j];
            console.log(i);

            console.log(response[i]._id, '1');
            // console.log(response[j]);
            total = total + response[i].price + response[j].price;
            console.log(total);
            // req.session.myCart.totalQty = i;
            console.log(req.session);
            console.log(total);

            // console.log(req.session.myCart[i], 'yo');
            // console.log(req.session.myCart[j].price);
            // console.log(req.session.myCart, 'hey');
            // console.log(response[0].price);
            // console.log(i);
          }
        }

        res.render('cartview.hbs', { response });
      })
      .catch((err) => console.log(err));
  }

  // if (!req.session.myCart) {
  //   res.render('cart.hbs');
  // } else {
  //   const id = req.session.myCart._id;
  //   console.log(id, 'id');

  //   Cart.findById(id)
  //     .populate('cartItems')
  //     .then((response) => {
  //       let total = 0;

  //       console.log(total);
  //       response.cartItems.forEach((cartItem) => {
  //         console.log(cartItem.price, 'priceee');
  //         total = total += cartItem.price;
  //         console.log(total);
  //       });
  //       console.log(response, 'yo2');
  //       console.log(response.totalPrice);
  //       response.totalPrice = total;

  //       console.log(response, 'hey');
  //       res.render('cart.hbs', { cartItems: response });
  //     });
  // }
});

router.post('/cart/:productId', (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  if (!req.session.myCart) {
    req.session.myCart = { _id: [], totalItems: 1 };
    req.session.myCart._id.push(productId);
    console.log(req.session);
    // console.log(product);
  } else {
    req.session.myCart._id.push(productId);
    req.session.myCart.totalItems = req.session.myCart.totalItems + 1;
    console.log(req.session);
  }
  console.log(req.session);
  // console.log(product);
  res.redirect('/shopAll');
  // res.redirect('/shopAll');
  // console.log(id, 'hey');
  // instead of having a cart array with hbunch of ids, push object with an id and quantity inside of it

  // product stored in session properly, with id and quantity insdie of it

  // this works but shouldnt do it like this.
  //check out find all products
  // Product.findById(productId).then((product) => {
  //   console.log(product, 'hey');
  //   // console.log(product);
  //   if (!req.session.myCart) {
  //     req.session.myCart = [];
  //     req.session.myCart.push({
  //       id: product._id,
  //       image: product.image,
  //       price: product.price,
  //     });
  //   } else {
  //     req.session.myCart.push({
  //       id: product._id,
  //       image: product.image,
  //       price: product.price,
  //     });
  //   }

  //   console.log(req.session);
  //   // console.log(product);
  //   res.redirect('/shopAll');
  //   // res.render('cart.hbs', product);
  // });
});

//      else {
//   const id = req.session.myCart._id;
//   console.log(id, 'yo');
//   Cart.findByIdAndUpdate(
//     id,
//     {
//       $push: { cartItems: product },
//     },
//     { new: true }
//   ).then((response) => {
//     req.session.myCart = response;
//     console.log(req.session);
//     res.redirect('/shopAll');
//   }).catch((err) => console.log(err))
// }

module.exports = router;

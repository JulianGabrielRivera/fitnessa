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
  if (!req.session.myCart) {
    res.render('cart.hbs');
  } else {
    const id = req.session.myCart._id;
    console.log(id, 'id');

    Cart.findById(id)
      .populate('cartItems')
      .then((response) => {
        let total = 0;

        console.log(total);
        response.cartItems.forEach((cartItem) => {
          console.log(cartItem.price, 'priceee');
          total = total += cartItem.price;
          console.log(total);
        });
        console.log(response, 'yo2');
        console.log(response.totalPrice);
        response.totalPrice = total;

        console.log(response, 'hey');
        res.render('cart.hbs', { cartItems: response });
      });
  }
});

router.post('/cart/:productId', (req, res, next) => {
  const { productId } = req.params;

  // console.log(id, 'hey');

  Product.findById(productId)
    .then((product) => {
      // console.log(product);
      if (!req.session.myCart) {
        Cart.create({ cartItems: product })

          .then((response) => {
            console.log(response, 'hey');

            req.session.myCart = response;
            console.log(req.session);
            // console.log(product);
            res.redirect('/shopAll');
            // res.render('cart.hbs', product);
          })
          .catch((err) => console.log(err));
      } else {
        const id = req.session.myCart._id;
        console.log(id, 'yo');
        Cart.findByIdAndUpdate(
          id,
          {
            $push: { cartItems: product },
          },
          { new: true }
        ).then((response) => {
          req.session.myCart = response;
          console.log(req.session);
          res.redirect('/shopAll');
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;

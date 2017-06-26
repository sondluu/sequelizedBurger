var express = require("express");

var router = express.Router();

// import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// // get route -> index
// router.get("/", function(req, res) {
//   res.redirect("/burgers");
// });

//create all routes and set up logic within those routes where required
router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.findAll({}).then(function(burgerData) {
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  burger.create({
    burger_name: req.body.burger_name, 
    devoured: 0
  }).then(function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  burger.update({devoured: 1},
    {
      where: {
        id: req.params.burger_id
        }
    }).then(function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});


//export routes for server.js to use.
module.exports = router;
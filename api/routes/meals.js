var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("my response");
})

module.exports = router;
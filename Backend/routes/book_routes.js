const express = require("express");
const router = express.Router();

const {getBook} = require("../controllers/book_controller") 

router.get("/",getBook) ;

module.exports = router;


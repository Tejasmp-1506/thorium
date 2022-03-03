const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)
//___________________________________________________________________________________

router.post("/createPublisher", publisherController.createPublisher)

router.get("/getAPublisherssData", publisherController.getPublisherData)
//___________________________________________________________________________________

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)
//____________________________________________________________________________________

//router.get("/getBooksData", bookController.getBooksData)

module.exports = router;
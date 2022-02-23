const express = require('express');
const router = express.Router();

//api to get movies
router.get('/movies', function (req, res) {
   let arr = ['iron man', 'cap america', 'thor']
    res.send(arr)
});

//api to get movies by serial
router.get('/movies/:index', function (req, res){
     let mov = ['iron man', 'cap america', 'thor'] 
     let value = req.params.index;
     if(value>mov.length){
         res.send('abey valid index daal')
     }else{
         res.send(mov[value])
     }
})

//api to get array of object

module.exports = router;
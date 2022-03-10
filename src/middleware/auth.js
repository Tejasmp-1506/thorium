const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel")

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status : false , msg : "token must be present in req header"})

    let decodedToken = jwt.verify(token, 'functionup-thorium')
    if(!decodedToken) return res.sed({status : false , msg : "token is invalid"})
    
    res.status(401).send({ msg: "authentication failed"})
    next()
}


const authorise = async function(req, res, next) {
    //validate the token in request header
        let token = req.headers["x-auth-token"]
        if(!token) return res.send({status : false , msg : "token must be present in req header"})

        let decodedToken = jwt.verify(token , 'functionup-thorium')
        if(!decodedToken) return res.send({status : false , msg : "token is invalid"})

    // comapre the logged in user's id and the id in request
        
        let usertobeModified = req.params.userId
        let loggedinUser = decodedToken.userId

        if(usertobeModified != loggedinUser) return res.send({status: false , msg: "user logged in is not allow to modify requested users data"})
         
        res.status(403).send({  msg : "forbidden"  })

    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
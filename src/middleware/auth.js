const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel")

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status : false , msg : "token must be present in req header"})

    let decodedToken = jwt.verify(token, 'functionup-thorium')
    if(!decodedToken) return res.sed({status : false , msg : "token is invalid"})

    next()
}


const authorise = async function(req, res, next) {
    //validate the token in request header
        let token = req.headers["x-auth-token"]
        if(!token) return res.send({status : false , msg : "token must be present in req header"})

        let decodedToken = jwt.verify(token , 'functionup-thorium')
        if(!decodedToken) return res.send({status : false , msg : "token is invalid"})

    // comapre the logged in user's id and the id in request
        let message = req.body.message;
        let usertobeModified = req.params.userId
        let loggedinUser = decodedToken.userId

        if(usertobeModified != loggedinUser) return res.send({status: false , msg: "user logged in is not allow to modify requested users data"})
         
    //but if user is real then we have to allow them to modify data

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status : false , msg : "user does not exist"})

    let updatedPosts = user.posts;
    updatedPosts.push(message)

    let updatedUser = await userModel.findOneAndUpdate({_id: user._id}, {posts: updatedPosts}, {new: true})
     
    res.send({status:true , msg: updatedUser})

    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
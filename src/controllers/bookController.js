const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let data = req.body
    let authorId = data.author
    let publisherId = data.publisher
    
    let author1 = await authorModel.findById(authorId)
    let publisher1 = await publisherModel.findById(publisherId)


    if(data.hasOwnProperty("author")){

        if(author1 === null){
            return res.send({error: "author is not present"})
        }else{
            if(data.hasOwnProperty("publisher")){
                if(publisher1 === null){
                    return res.send({error : "publisher is not present"})
                }else{
                    let bookData = await bookModel.create(data)
                    return res.send({book : bookData})
                }
            } else{
                return res.send({error : "publisher id is required"})
            }
        }
    }else{
        return res.send({error : "author id is required"})
    }


}

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate("author").populate("publisher")
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails

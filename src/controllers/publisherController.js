const PublisherModel = require ("../model/publisherModel")


const createPublisher = async function(req,res){

    let publisherCreated = await PublisherModel.create(req.body)
    res.send({data : publisherCreated})

}

const getPublisherData = async function (req,res){
    let listofPublishers = await AuthodModel.find()
    res.send({data : listofPublishers})
}





module.exports.createPublisher = createPublisher
module.exports.getPublisherData = getPublisherData
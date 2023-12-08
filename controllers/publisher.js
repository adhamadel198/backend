const publishersService = require('../services/publisher');

module.exports.getpublishers = async (req,res)=>{
    try{
        const publishers = await publishersService.findAllpublishers();
        res.send({publishers});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};

module.exports.postPublisher =async(req,res)=>{
    console.log(req.body);
    const publisherInfo={
        name: req.body.name,
        password: req.body.password,
        profilePic: req.body.profilePic,
        draft:req.body.draft
    };
    try{
        const createdPublisher = await publishersService.addNewPublisher(publisherInfo);
        return res.status(201).send({
            msg: 'publisher created successfully',
            publisherId: createdPublisher._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    };
}
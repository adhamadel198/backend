const publisherModel = require('../models/publisher');

module.exports.findAllpublishers = async () => {
    try {
        const publishers = await publisherModel.find();
        return publishers;
    } catch (err) {
        throw new Error('Could not retrieve publishers');
    }
};

module.exports.addNewPublisher = async (publisherInfo) => {
    try {
        const publisher = new publisherModel({
            name: publisherInfo.name,
            password: publisherInfo.password,
            profilePic: publisherInfo.profilePic,
            draft: publisherInfo.draft
        });
        const createdPublisher = await publisher.save();
        
        
        
        return createdPublisher;
    } catch (err) {
        throw new Error('Could not create publisher');
    }
};
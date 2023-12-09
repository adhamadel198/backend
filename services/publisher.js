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

module.exports.deletePublisherById = async (publisherId) => {
    try {
        const deletedPublisher = await publisherModel.findByIdAndDelete(publisherId);

        if (!deletedPublisher) {
            throw new Error('Publisher not found');
        }

        return deletedPublisher;
    } catch (err) {
        throw new Error('Could not delete publisher');
    }
};
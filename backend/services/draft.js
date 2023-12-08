const DraftModel= require('../models/draft');
const {ObjectId} = require('mongoose').Types;
module.exports.findAllDrafts = async()=>{
try{
    const drafts= await DraftModel.find();
    return drafts;

}catch(err){
    throw new Error('could not retrieve drafts');
}

};

module.exports.addNewDraft= async(draftInfo)=>{
    try{
        const draft= new DraftModel({
            name:draftInfo.name,
            artical:draftInfo.artical,
            date:draftInfo.date,
            image:draftInfo.image,
            articalType:draftInfo.articalType,
            publisherId:new ObjectId(draftInfo.publisherId)
        });
        const draftArtical= await draft.save();
        return draftArtical;
    }catch(err){
        throw new Error('could not creat draft.');
    }
};



module.exports.findAllDrafts = async (publisherId) => {
    try {
        // Use publisherId in the query to filter drafts for a specific publisher
        const query = publisherId ? { publisherId } : {};
        const drafts = await DraftModel.find(query);
        return drafts;
    } catch (err) {
        throw new Error('Could not retrieve drafts');
    }
};
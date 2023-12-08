const {Schema, model}= require('mongoose');

const DraftSchema = new Schema({
name:{
    type: String,
    required: true
},
artical: {
    type: String,
    required: true
},
date:{
    type: String,
    required:true
},
image:{
    type: String,
    required:true
},
articalType:{
    type: String,
    required:true
},
publisherId: {
    type: Schema.Types.ObjectId,
    ref: 'publisher', 
    required: true
}

});
const DraftModel= model('drafts', DraftSchema);

module.exports = DraftModel;
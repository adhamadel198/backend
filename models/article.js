const {Schema,model} = require('mongoose');

const articleschema = new Schema({
    description:{
        type:'String',
        required: true
    },
    publishdate:{
        type:'String',
        required: true
    },
    keyword:{
        type:'String',
        required: true
    },
    imgurl:{
        type:'String'
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: 'publisher', 
        required: true
    }
});
const articlemodel = model('article',articleschema);

module.exports = articlemodel;
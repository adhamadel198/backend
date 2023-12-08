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
    }
});
const articlemodel = model('article',articleschema);

module.exports = articlemodel;
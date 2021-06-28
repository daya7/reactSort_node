const {Schema, model} =require('mongoose');

const schema= new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    sorting:{
        type: Number,
        default: 0
    }
});

module.exports = model('book', schema);
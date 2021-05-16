const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:ObjectId,
        ref:'Users'
    }
});

module.exports = mongoose.model('Tasks',taskSchema);
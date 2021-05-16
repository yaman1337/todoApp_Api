const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {db_url,PORT} = require('./keys');
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/addTodo'));
// database connection
mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log('connected');
})

// server port configuration
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})
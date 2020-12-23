const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');



// Load env vars
dotenv.config({
    path: './config/config.env'
})


// load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


// Read JSON file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));


// Import into DB
const importData = async ()=>{
    try{
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    }catch(err){
        console.log(err);
    }
}

// Delete data
const deleteData = async ()=>{
    try{
        await Bootcamp.deleteMany();
        console.log('Data Destroyed.....'.red.inverse);
        process.exit();
    }catch(err){
        console.log(err);
    }
}



// argv[2] need to pass into command line while using. comment line.like.
// node seeder.js -i [here i for import]
// or
// node seeder.js -d [here d for Delete]
if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}
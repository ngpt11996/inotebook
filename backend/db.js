const mongoose=require('mongoose');
const mongoURI="mongodb+srv://ngpt11996:Q5LaxjHGhxcEPpPM@cluster0.ofudtej.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo= ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to mongo Successfully.")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports= connectToMongo;
const express=require('express');
const path=require('path');

const port=8009;

const app=express();

// const db=require('./config/mongoose');

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://tanviViradiya28:Tanvi123@cluster0.sk3ly.mongodb.net/movie", {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
})
.then(() => console.log("DB is connected"))
.catch((err) => console.log(err));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));

app.use(express.urlencoded());

app.use('/uploads/imageuploads',express.static(path.join(__dirname,'uploads/imageuploads')));

app.use('/',require('./routes/movieRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is start."+port);
})
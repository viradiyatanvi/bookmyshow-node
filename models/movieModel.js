const mongoose=require('mongoose');

const imagePath='/uploads/imageuploads';

const path=require('path');

const multer=require('multer');

const MovieSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    tagline:{
        type:String,
        required:true,
    },
    gener:{
        type:Array,
        required:true,
    },
    language:{
        type:Array,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    moviedate:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
});

const StorageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

MovieSchema.statics.uploadaImageFile=multer({storage:StorageImage}).single('image');
MovieSchema.statics.imgPath=imagePath;

const Movie=mongoose.model("Movie",MovieSchema);

module.exports=Movie;
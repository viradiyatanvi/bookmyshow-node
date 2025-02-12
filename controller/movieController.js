const Movie = require('../models/movieModel');
const Comment=require('../models/commentModel');

module.exports.addmovie = (req, res) => {
   try{
    return res.render('movie/addmovie');
   }
   catch(err){
    console.log("somethinf is wrong");
   }
}

module.exports.insertdata = async (req, res) => {
    try {
        let imagePath = '';
        if (req.file) {
            imagePath = await Movie.imgPath + '/' + req.file.filename;
        }
        req.body.image = imagePath;
        await Movie.create(req.body);
        return res.redirect('/view_movie');
    } catch (err) {
        console.error('Error inserting movie data:', err);
    }
}

module.exports.view_movie=async(req,res)=>{
    let search='';
    if(req.query.search){
        search=req.query.search;
    }

    let per_page=2;
    let page=0;
    if(req.query.page){
        page=req.query.page;
    }

    let singledata=await Movie.find({
        $or:[
            {title:{$regex:search}},
            {rating:{$regex:search}},
            {gener:{$regex:search}},
        ]
    }).skip(page*per_page).limit(per_page);

    let totaldata=await Movie.find({
        $or:[
            {title:{$regex:search}},
            {rating:{$regex:search}},
            {gener:{$regex:search}},
        ]
    }).countDocuments();
    totalcount=Math.ceil(totaldata/per_page);

    return res.render('movie/view_movie',{
        singledata,
        search,
        page,
        totalcount,
    });
}

module.exports.view=async(req,res)=>{
    let singledata=await Movie.find();
    return res.render('movie/view',{
        singledvieata
    });
}

module.exports.viewdata=async(req,res)=>{
    let singleobj=await Movie.findById(req.params.id);
    const commentView=await Comment.find();
    return res.render('movie/view',{
        singleobj,commentView
    })
}

module.exports.insertcomment=async(req,res)=>{
    await Comment.create(req.body);
    return res.redirect('back');
}

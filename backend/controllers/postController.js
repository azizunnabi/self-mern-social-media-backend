const { validationResult}= require("express-validator");
const PostModel = require("../models/Post");
const CommentModel = require("../models/Comment");
const { post } = require("../routes/postRoutes");
module.exports.createPost= async( req, res)=>{
    console.log("welcome to post")
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const { body, postImage,user } = req.body;
            const createdPost = await PostModel.create({body,postImage,user});
            return res.status(200).json({msg : "Post has been created"});
   
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }else{
        return res.status(400).json({errors: errors.array()})
    }
}


//get/Display posts
module.exports.getPosts = async (req, res)=>{
try {
   // console.log(user)
    //const posts=await PostModel.find({user: req.user._id}).populate("user", "postTitle postDescription _id");

    const posts=await PostModel.find({user: req.user._id}).populate("user", "-password")
   // console.log(posts)
   return res.status(200).json(posts)
} catch (error) {
    return res.status(500).json({error: error.message})
}
}


//get all posts
module.exports.getAllPosts = async (req, res)=>{
    try {
       // console.log(user)
        //const posts=await PostModel.find({user: req.user._id}).populate("user", "postTitle postDescription _id");
    

        //find({}) mean display all posts
        const posts=await PostModel.find({}).populate("user", "-password").populate("comments")
       // console.log(posts)
       return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    }

//delete posts
// module.exports.deletePosts = async(req,res)=>{
//     const {id}=req.params
//     //console.log(id)
//   //req.params is used do display single id
//   //req.query is used to display more then one fields
//   const user= req.user._id;
//   if( !id || id ===""|| id ===undefined){
// return res.status(400).json({error: "id is required"})
//   }

//   try {
//     //in below line {user} means {user: user}
//     await PostModel.findByIdAndDelete({$and : [{_id: id},{user}]})
//     return res.status(200).json({msg: "Deleted"})
//   } catch (error) {
//     return res.status(401).json({error: error.message})
//   }
  
// }

//Delete Post
module.exports.deletePosts = async (req, res) => {
    const { id } = req.params;
    if (!id || id === "") {
      return res.status(400).json({ msg: "id is required" });
    }
    try {
      await PostModel.deleteOne({ $and: [{ _id: id }, { user: req.user._id }] });
      return res.status(200).json({ msge: "post has been deleted" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

//update post
// module.exports.updatePost = async (req,res)=>{
   
//     const errors = validationResult(req)
    
//     if(errors.isEmpty()){
        
//     const {body,postImage,user}= req.body;
//     const { id } = req.params;
//         try {

//             const response = await PostModel.findOneAndUpdate({
//              $and: [{_id:id},{user: req.user._id}],
//             },
//             {$set : {
//                 body,
//                 postImage,
//                 user,
//             },});
//             return res.status(200).json({msg : "post has been updated",  post:response})
//             console.log("post updated")
//         } catch (error) {
//             return res.status(500).json({error: error.message})
//         }
//     }
// }


//update post
module.exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const { body, postImage, user } = req.body;
        const { id } = req.params;
        await PostModel.findOneAndUpdate(
          { $and: [{ _id: id }, { user: req.user._id }] },
          {
            $set: {
              body,
              postImage,
              user,
            },
          }
        );
        res.status(200).json({ msg: "post has been updated" });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    } else {
      return res.status(200).json({ error: errors.array() });
    }
  };
  module.exports.createComment = async (req, res) => {
    const { body, post } = req.body;
    if (!body || body.trim() === "" || body === undefined) {
      return res.status(400).json({ error: "message body is required" });
    }
    if (!post || post.trim() === "" || post === undefined) {
      return res.status(400).json({ error: "post id is required" });
    }
    try {
      const findPost = await PostModel.findOne({ _id: post });
      // {_id: 'sdfsdf', title: 'some comemnt', body: 'body ' createdAt: 'sdfsd', updatedAt: 'sdfsd', comments: []}
      if (findPost) {
        const createdComment = await CommentModel.create({
          ...req.body,
          user: req.user._id,
        });
        // push comment id into comments array
        findPost.comments.push(createdComment._id);
        // save in the database
        await findPost.save();
        return res.status(200).json({ msg: "Comment published" });
      } else {
        return res.status(404).json({ error: "post not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server internal error" });
    }
  };

  //delete comment
  module.exports.deleteComment = async (req,res)=>{
    const {commentId, postId } = req.body;
    if(!commentId || commentId === undefined || commentId.trim()=== ""){
      return res.status(400).json({error: "Comment id is required"});
    }
    if(!postId || postId === undefined || postId.trim() === ""){
      return res.status(4000).json({error: "post id is required"});
    }
    try {
      await CommentModel.findOneAndDelete({_id: commentId});
      const post = await PostModel.findOne({_id : postId});
      if(post){
        const filtered = post.comments.filter(
          (comment) => comment._id !== commentId
        );
        post.comments = filtered;
        await post.save();
        return res.status(400).json({msg : "Comment has been deleted"});
      }else{
        return res.status(404).json({ error: "post not found" });
      }
    } catch (error) {
      return res.status(500).json({error: "Server internal error"});
    }
  };

  //Update Comment
  module.exports.updateComment = async(req,res)=>{
    const {commentId, body}=req.body;
    if (!commentId || commentId === undefined || commentId.trim() === "") {
      return res.status(400).json({ error: "comment id is required" });
    }
    if (!body || body === undefined || body.trim() === "") {
      return res.status(400).json({ error: "body is required" });
    }
    try {
      await CommentModel.findOneAndUpdate(
        {_id: commentId},
        {$set: {
          body,
        }}
        )
        return res.status(200).json({msg : "Comment has been updated"})
    } catch (error) {
      return res.status(400).json({error: "server internal error"})
    }
  }
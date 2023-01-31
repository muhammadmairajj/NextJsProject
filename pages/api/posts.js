const { connectToDatabase } = require("../../lib/mongodb.js");
const ObjectId = require("mongodb").ObjectId;

export default function handler(req, res) {
  switch(req.method) {
    case "GET": {
      return getPosts(req, res);
    }
    case "POST": {
      return addPost(req, res);
    }
    case "DELETE": {
      return deletePost(req, res);
    }
    case "PUT": {
      return updatePost(req, res);
    }
  }

 async function getPosts(req, res) {
    try {
      // connect to the Database:
      let { db } = await connectToDatabase();
      // fetch the posts:
      let posts = await db.collection('posts').find({}).sort({published: -1}).toArray()
      // Return the posts
      return res.json({
        message: JSON.parse(JSON.stringify(posts)),
        success: true
      })
    } catch(error) {
      // return the error
      return res.json({
        message: new Error(error).message,
        success: false
      })
    }
  }

  // insert data to mongodb
  async function addPost(req, res) {
    try {
      // connect to the database
      let { db } =  await connectToDatabase();
      // add the post
      await db.collection('posts').insertOne(JSON.parse(req.body));
      // return a message
      return res.json({
        message: "Post added Successfully",
        success: true
      })
    } catch(error) {
      return res.json({
        message: new Error(error).message,
        success: false
      })
    }
  }

  // delete post from db
  async function deletePost(req, res) {
    try {
      let { db } = await connectToDatabase();
      // Deleting the Post
      await db.collection('posts').deleteOne({
        _id: new ObjectId(req.body)
      });
      // return a message:
      return res.json({
        message: "Post deleted Successfully",
        success: true
      });
    } catch(error) {
      return res.json({
        message: new Error(error).message,
        success: false
      })
    } 
  }
  // publish / update post
  async function updatePost() {
    try {
      let { db } = await connectToDatabase();
      // Updating the post
      await db.collection('posts').updateOne({
        _id : new ObjectId(req.body)
      }, {
        $set: {published : true}
      }
      )
      // return a message:
      return res.json({
        message: "Post updated Successfully",
        success: true
      });
    } catch(error) {
      return res.json({
        message: new Error(error).message,
        success: false
      })
    }
  }
}

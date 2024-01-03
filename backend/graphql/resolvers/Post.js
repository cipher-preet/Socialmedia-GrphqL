const Post = require("../../models/Post");
const checkAuth = require("../../utils/ChechAuth");
const { AuthenticationError,UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createdPost(_, { body }, context) {
      const user = checkAuth(context);

      if(args.body.trim() === ''){
        throw new Error("Post body must not not be empty");
      }

      console.log(user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log("real user ",user)

      try {
        const post = await Post.findById(postId);
        console.log("real post",post);
        if (!post) {
            throw new AuthenticationError("Post not found");
          }
        if (user.username === post.username) {
            await Post.deleteOne({ _id: postId });
            return "post is deleted sucessfully";
        } else {
          throw new AuthenticationError("action is not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_,{postId},context){
      const { username} = checkAuth(context);

      const post = await Post.findById(postId);

      if(post){
        if(post.likes.find((like)=> like.username === username)){
          //post already like
          post.likes = post.likes.filter((like) => like.username !== username);
        }else{
          //not like , like post
          post.likes.push({
            username,
            createdAt:new Date().toISOString()
          })
        }
        await post.save();
        return post;
      }else throw new UserInputError("Post not found")
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};

const Post = require("../../models/Post")
const {UserInputError, AuthenticationError} = require("apollo-server");

const checkAuth = require("../../utils/ChechAuth")

 module.exports = {
    Mutation:{
        createComment: async (_,{postId,body},context) =>{
            const {username} = checkAuth(context);

            if(body.trim() === ''){
                throw new UserInputError('empty comments',{
                    errors:{
                        body:"commment body must not empty"
                    }
                })
            }

            const post = await Post.findById(postId)

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt:new Date().toISOString()
                })
                await post.save();
                return post;
            }else throw new UserInputError("post not found")
        },
        async deleteComment(_,{postId,commentId},context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId)

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError("action is not allowed")
                }
            }else{
                throw new UserInputError("post not found")
            }
        }
    }
 }
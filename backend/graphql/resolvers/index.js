const postResolvers = require("./Post");
const userResolvers = require("./User");
const commentsResolvers = require("./Comments")
module.exports = {
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription
    }
}
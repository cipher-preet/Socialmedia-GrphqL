import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, GridRow, Image } from "semantic-ui-react";
import PostCard from "../PostCard";

const Home = () => {
  const {
    loading,error,
    data
  } = useQuery(FETCH_POST_QUERY);

  if (loading) {
    return <h1>Loading......</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error loading posts. Please try again later.</h1>;
  }

  const posts = data.getPosts;


  return (
    <Grid columns={3} divided>
      <GridRow>
        <h1>Recents Post</h1>
      </GridRow>
      <Grid.Row>
        {loading ? (
          <h1>Loading......</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      likeCount
      commentCount
      username
      createdAt
      comments {
        body
        id
        username
      }
      likes {
        id
        username
      }
    }
  }
`;

export default Home;
